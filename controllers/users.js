const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const {userInsert,userUpdate,usersSelect,userSelect,userDelete} = require('../models/userQuery');

const usersGet = async(req, res = response) => {
    const users = await usersSelect();
    const count = users.length;
    console.log(users);
    res.json({
            count,
            users:users
    });
}
const userGet = async(req, res = response) => {
    const {id} = req.params;
    const user = await userSelect(id);
    res.json({
        user:user
    });
}
const usersPost = async(req, res = response) => {
    
    const user = req.body;
    //Encryptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    //Guardar BD
    const result = await userInsert(user);
    if(result.affectedRows > 0){
        res.json('User created successfully');
    }else{
        res.json('User not created');
    }
}
const usersPut = async (req, res = response) => {
    const {id} = req.params;
    const {password, ...rest} = req.body;
    //validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }
    rest.code=id;
    const result = await userUpdate(rest);
    if(result.affectedRows > 0){
        res.json('User updated successfully');
    }else{
        res.json('User not created');
    }
};
const usersDelete = async(req, res = response) => {
    const {id} = req.params;
    const result  = await userDelete(id);
    if(result.affectedRows > 0){
        res.json('User deleted successfully');
    }else{
        res.json('User not deleted');
    }
}

module.exports={
    usersPost,
    usersPut,
    usersGet,
    userGet,
    usersDelete
}