const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema(
    {
      fullName: {
        type: String,
        required: true,
        minlength:3,
        maxlength:50
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      password:{
        type: String,
        required: false,
        minlength:6,
        maxlength:50
      }
    },
    {versionKey: false});

const User = mongoose.model("User", userScheme);
module.exports = User;
