const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    //userType: {
     //   type: String,
     //   required: true,
    //},

    password: {
        type: String,
        required: true,
    },
repeatpassword:{
    type: String,
    required: true,
}


});
const  Register = new mongoose.model("Register",userSchema );
module.exports = Register;