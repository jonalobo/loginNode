const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate_JWT');

const login = async(req,res=response) => {
    const {email, password} = req.body;
    
    try {
        //verificar si el usuario existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(
                {msg: 'User / Password are not correct'
            });
        }
        //si el usuatio esta activo
        if(!user.status){
            return res.status(400).json({
                msg: 'User / Password are not correct status:false'
            });
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }
        //crear un token
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: 'contact administrator',
        });
    }
}


module.exports = {
    login
}