const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT  = async(req = request,res = response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No token provided'
        });
    }
    try {
        const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuaio que corresponde al uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'The user not exist'
            });
        }
        
        // verificar si el usuario esta en estado true
        if(!user.status){
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
