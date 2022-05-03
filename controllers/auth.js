const {response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/generate_JWT');
const {usertSelectEmail} = require('../models/userQuery');

const login = async (req,res=response) => {
    const {email, password} = req.body;
    
    try {
        //verificar si el usuario existe
        const user = await usertSelectEmail(email);
       if(!user){
            return res.status(400).json(
                {msg: 'User / Password are not correct'
            });
        }
        //si el usuatio esta activo
        if(user.per_status === 0){
            return res.status(400).json({
                msg: 'User / Password are not correct status:false'
            });
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.per_password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }
        //crear un token
        const token = await generateJWT(user.per_code);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'contact administrator',
        });
    }
}


module.exports = {
    login
}