const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const {usertSelectId} = require('../models/userQuery');

const validateJWT  = async(req = request,res = response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No token provided'
        });
    }
    try {
        const {id}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuaio que corresponde al id
        const user = await usertSelectId(id);

        if(!user){
            return res.status(401).json({
                msg: 'The user not exist'
            });
        }
        // verificar si el usuario esta en estado true
        if(!user.per_status){
            return res.status(401).json({
                msg: 'The user is inactive'
            });
        }
        req.user = user;
        next();
    } catch (error) {   
        res.status(401).json({
            msg: 'Token invalid'
        });
    }
}

module.exports = {
    validateJWT
}   
