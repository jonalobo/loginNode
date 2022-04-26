const Role = require('../models/role');
const User = require('../models/user');
//verificar si el rol existe
const isRoleValidate = async(role = '')=>{
    const rolExist = await Role.findOne({role});
    if(!rolExist){
        throw new Error(`The role ${role} does not exist`);
    }
}
//verificar si el correo existe
const isEmailValidate = async(email = '')=>{
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`The email ${email} already exist`);
    }
}
const exitIdForUser = async(id)=>{
    const idExist = await User.findById(id);
    if(!idExist){
        throw new Error(`The id: ${id}does not exist`);
    }
}

module.exports = {
    isRoleValidate, 
    isEmailValidate,
    exitIdForUser
}