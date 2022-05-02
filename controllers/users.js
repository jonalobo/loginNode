const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const {userInsert,userUpdate,usersSelect,userSelect,userDelete} = require('../models/userQuery');

const usersGet = async(req, res = response) => {
    usersSelect((result)=>{
        const count = result.length;
        res.json({
            count,
            users:result
        });
    });
}
const userGet = async(req, res = response) => {
    const {id} = req.params;
    userSelect(id, (result)=>{
        res.json({
            user:result
        });
    });
}
const usersPost = (req, res = response) => {
    
    const user = req.body;
    //Encryptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    //Guardar BD
    userInsert(user,(result)=>{
        if(result.affectedRows > 0){
            res.json('User created successfully');
        }else{
            res.json('User not created');
        }
    });
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
    userUpdate( rest,(result)=>{
        if(result.affectedRows > 0){
            res.json('User updated successfully');
        }else{
            res.json('User not created');
        }
    });
}
const usersDelete = async(req, res = response) => {
    const {id} = req.params;
    userDelete(id, (result)=>{
        res.json('User deleted successfully');
    });
}

module.exports={
    usersPost,
    usersPut,
    usersGet,
    userGet,
    usersDelete
}