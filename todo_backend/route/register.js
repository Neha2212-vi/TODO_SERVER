const express = require('express');
const router = express.Router();
const { userModel, validate } = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(401).send({
                message: error.details[0].message
            })
        }
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).send({
                message: "This email_id already exist"
            })
        }
        const salt = await bcrypt.genSalt(Number(process.env.salt));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new userModel({...req.body, password:hashPassword, confirm_password:hashPassword}).save();
        return res.status(200).send({
            message : "Registered successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})
module.exports = router;