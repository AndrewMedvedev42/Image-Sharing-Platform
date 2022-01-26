const mongoose = require('mongoose');
//IMAGE MODEL SCHEMA
const ImageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
        maxlength:[20, 'no longer than 20 characters']
    },
    description:{
        type:String,
        required:[true, 'must providename'],
        trim:true,
    },
    dateOfCreation:{
        type:String,
        default:"--/--/--"
    },
    author:{
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
            }
        }
})

module.exports = mongoose.model('Image', ImageSchema)