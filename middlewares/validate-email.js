const {response} = require('express');
const {usertSelectEmail} = require('../models/userQuery');

const isEmailValidateUpdate = async (req, res = response, next)=>{
    const {email} = req.body;
    const {id} = req.params;
    const emailExist = await usertSelectEmail(email);
    if(emailExist && emailExist.per_code != id){
        return res.status(401).json({
            msg: `The email ${email} already exist`
        });
    }
    next();
};

module.exports = {
    isEmailValidateUpdate
}