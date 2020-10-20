const User = require('../models/users');
const {registerVaildation, loginVaildation} = require('../Validation/Validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = function(app){
    
    //register get 
    app.get('/register', function(req,res) {
        res.render('register')
    })

    //register post
    app.post('/register', async function(req,res,next){
    
        //joi validation
        const {error} = registerVaildation(req.body);
        if(error) return res.status(400).json(error.details[0].message);

        //check whether that email exist or not
        const emailExist = await User.findOne({email: req.body.email.toLowerCase()})
        if(emailExist) return res.status(400).json('Email already exists');

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        //save the new user to mongodb
        try{
            
            const savedUser = await user.save();
            
            console.log(savedUser)
            //create a token
            const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECERT);            
        
            //set cookie by using cookie parser
            res.cookie('auth-token', token, {httpOnly: true})
        
            res.json('register successed');
        

        } catch(e) {
            res.status(400).json(e)
        }
    
    });

    //login get
    app.get('/login', function(req,res) {
        res.render('login')
    })

    //login post
    app.post('/login', async function(req,res){
    
        //joi validation
        const {error} = loginVaildation(req.body);
        if(error) return res.status(400).json(error.details[0].message);

        //check whether that email exist or not
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json('This email not exist');

        //check the password
        const correctPassword = await bcrypt.compare(req.body.password, user.password); 
        if(!correctPassword) return res.status(400).json('Invaild password!');
        
        //create a token
        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECERT);
        // res.header('auth-token',token).json('successed');
        // res.setHeader('Set-Cookie',`auth-token=${token}`);
        
        //set cookie by using cookie parser
        res.cookie('auth-token',token,{httpOnly: true});
        res.json('login');
        
    });

    //logout 
    app.get('/logout', async function (req,res) {
        res.cookie('auth-token','',{ httpOnly: true, maxAge:1 });
    })

}