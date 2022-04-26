const {response} = require('express');

const confirmPassword = (req, res = response, next)=>{
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        return res.status(401).json({
            msg: 'password does not match'
        });
    }
    next();
}


module.exports={
    confirmPassword
}