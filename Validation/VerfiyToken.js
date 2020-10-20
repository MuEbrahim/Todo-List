const jwt = require('jsonwebtoken');
const User = require('../models/users');

//check if the token which in the cookie valid or not.
module.exports.verifyToken = function (req, res, next) {
   
    const token = Object.values(req.cookies)[0];   
    if(!token) res.redirect('/login');

    try{
        const verfied = jwt.verify(token,process.env.TOKEN_SECERT);
        req.user = verfied;
        next();
    } catch (e) {
        res.status(400).send('Invalid token');
    }

}

//make the current user name public to pages
module.exports.checkUser = async function (req,res,next) {

    const token = Object.values(req.cookies)[0];   
    
    if(token){
        
        try{
            const verfied = jwt.verify(token,process.env.TOKEN_SECERT);
            const user =  await User.findById(verfied._id);
            res.locals.user = user.name; 
            next();
        } catch (e){
            console.log(e)
        }

    } else {
        next();
    }
}