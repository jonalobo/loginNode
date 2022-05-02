const {response } = require('express');

const { usertSelectEmail,usertSelectId } = require("../models/userQuery");
const { usertSelectRole } = require("../models/roleQuery");

//verificar si el correo existe

const isEmailValidate = (req, res = response, next)=>{
    const {email} = req.body;
    usertSelectEmail(email,(result)=>{
        console.log(result);
        if(result){
            return res.status(401).json({
                msg: `The email ${email} already exists`
            });
        }
        next();
    });
}
const isEmailValidateUpdate = (req, res = response, next)=>{
    const {email} = req.body;
    const {id} = req.params;
    usertSelectEmail(email,(result)=>{
        if(result && result.per_code != id){
            return res.status(401).json({
                msg: `The email ${email} already exists`
            });
        }
        next();
    });
};

//verificar si el rol existe
const isRoleValidate = (req, res = response, next)=>{
    const {role} = req.body;
    usertSelectRole(role,(result)=>{
        if(!result){
            return res.status(401).json({
                msg: `The role ${role} does not exist`
            });
        }
        next();
    });
}
const exitIdForUser = (req, res = response, next)=>{
    const {id} = req.params;
    usertSelectId(id,(result)=>{
        if(!result){
            return res.status(401).json({
                msg: `The id: ${id} does not exist`
            });
        }
        next();
    });
}

module.exports = {
    isEmailValidate,
    isRoleValidate,
    isEmailValidateUpdate,
    exitIdForUser
}