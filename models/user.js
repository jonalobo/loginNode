const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type:String,
        required: [true, 'The name is required']
    },
    email:{
        type:String,
        required: [true, 'The email is required'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'The password is required']
    },
    password:{
        type:String,
        required: [true, 'The password confirmation is required']
    },
    role:{
        type:String,
        required: true,
        emun: ['USER_ROLE','ADMIN_ROLE']
    },
    status:{
        type:Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function(){
    const {__v, password, _id,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('user', userSchema);