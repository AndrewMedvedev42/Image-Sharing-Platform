const mongoose = require('mongoose');
const ImageModel = require("./image")
//USER MODEL SCHEMA
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    lastName:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    userName:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    email:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    password:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    activeAccount:{
         type:Boolean,
         default:true
    },
    imageList:[ImageModel.schema]
})

module.exports = mongoose.model('User', UserSchema)