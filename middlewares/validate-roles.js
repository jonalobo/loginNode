const {response} = require('express');

const adminRole = (req, res = response, next)=>{
    if(!req.user){
       return res.status(500).json({
           msg: 'Validate role'
       });
    }
    const {role, name} = req.user;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `the user ${name} is not a administrator`
        });
    }
    next();
}
const haveRole = (...roles)=>{
    return (req, res = response, next)=>{
        if(!req.user){
            return res.status(500).json({
                msg: 'Validate role'
            });
         }
         if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Required role ${roles}`
            });
         }
        next();
    }
}

module.exports = {
    adminRole,
    haveRole
}