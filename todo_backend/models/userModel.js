const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    email : {type:String, required:true},
    password : {type:String, required:true},
    confirm_password : {type:String, required:true}
});

const userModel = mongoose.model('user', userSchema);

const validate = (data)=>{
    const schema = Joi.object({
        email : Joi.string().email().required().label("Email"),
        password : passwordComplexity().required().label("Password"),
        confirm_password : Joi.any().equal(Joi.ref('password')).required().label("Confrim Password")
    })
    return schema.validate(data);
}

module.exports = {userModel, validate}