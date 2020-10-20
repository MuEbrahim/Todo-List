//joi
const joi = require('@hapi/joi')

const registerVaildation = (data) => {
    
    //joi validation schema
    const schema = joi.object({
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required(),
        password:joi.string().min(6).required(),
    }) 

    return schema.validate(data);
}

function loginVaildation(data) {
    
    //joi validation schema
    const schema = joi.object({
        email:joi.string().min(6).required(),
        password:joi.string().min(6).required()
    }) 

    return schema.validate(data);

}

module.exports.registerVaildation = registerVaildation;
module.exports.loginVaildation = loginVaildation;