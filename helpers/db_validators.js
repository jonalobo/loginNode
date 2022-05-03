const { usertSelectEmail,usertSelectId } = require("../models/userQuery");
const { usertSelectRole } = require("../models/roleQuery");

//verificar si el correo existe

const isEmailValidate = async (email = '')=>{
    const emailExist = await usertSelectEmail(email);;
    if(emailExist){
        throw new Error(`The email ${email} already exist`);
    }
}
//verificar si el rol existe
const isRoleValidate = async (role = '')=>{
    const rolExist = await usertSelectRole(role);
    if(!rolExist){
        throw new Error(`The role ${role} does not exist`);
    }
}
const exitIdForUser = async (id='')=>{
    const idExist = await usertSelectId(id);
    if(!idExist){
        throw new Error(`The id: ${id} does not exist`);
    }
}

module.exports = {
    isEmailValidate,
    isRoleValidate,
    exitIdForUser
}