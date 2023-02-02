const express = require('express');
const router = express.Router();
const { userModel} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const passwordComplexity = require('joi-password-complexity');
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(401).send({
                message: error.details[0].message
            })
        }
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                message: "Invalid email_id or password"
            })
        }
        
        const validatePassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if(!validatePassword){
            return res.status(401).send({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({_id:this._id}, process.env.jwt_privateKey, {expiresIn:"2h"})
        return res.status(200).send({
            data : token,
            message : "Loggen in successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

const validate = (data)=>{
    const schema = Joi.object({
        email : Joi.string().email().required().label("Email"),
        password : passwordComplexity().required().label("Password"),
    })
    return schema.validate(data);
}

module.exports = router;