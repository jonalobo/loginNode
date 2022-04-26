const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const usersGet = async(req, res = response) => {
    const {limit=5,from = 0} = req.query;
    const query = {status:true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)) 
    ]);
    res.json({
        total,
        users
    });
}
const usersPost = async (req, res = response) => {
    
    const {name, email, password,confirmPassword, role} = req.body;
    const user = new User({name, email, password,confirmPassword, role});

    //Encryptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.confirmPassword = bcrypt.hashSync(confirmPassword, salt);
    //Guardar BD
    await user.save();
    //enviar respuesta  
    res.json({
        user
    });
}
const usersPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id,password, email, ...rest} = req.body;
    //validar contra base de datos

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json(user);
}
const usersDelete = async(req, res = response) => {
    const {id} = req.params;

    //borrado 
    const user = await User.findByIdAndUpdate(id, {status:false});
    const userAuthenticated = req.user;

    res.json({
        user
    });
}
const usersPatch = (req, res = response) => {
    res.json({
        msg:'patch API- controllers'
    });
}
module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}