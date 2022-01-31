const User = require("../models/user")
const ImageModel = require("../models/image")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' +file.originalname)
    }
  })
  

const getAllImages = async(req,res) => {
    try {
        const user = await User.find({})
        const images = []
        user.forEach(element => {
            element.imageList.forEach(item => {
                images.push(item)
            });
        });
        console.log(images);
        res.status(201).json({images})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//ADDS IMAGE INFO INTO DATA BASE
const addImage = async(req,res, next) => {
    try {
        function base64_encode(file) {
            return file.toString('base64');
        }
        const {userID:userID} = req.params
        const user = await User.findOne({_id:userID}, function(err, user){
            const imageModel = new ImageModel();
            imageModel.title = req.body.title
            imageModel.description = req.body.description
            imageModel.dateOfCreation = req.body.dateOfCreation
            imageModel.author.firstName = user.firstName
            imageModel.author.lastName = user.lastName
            imageModel.author.userName = user.userName
            imageModel.image = `<img src="data:${req.files.file.mimetype};base64,${base64_encode(req.files.file.data)}" />` 
            user.imageList.unshift(imageModel)
            user.save()
        })    
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//UPDATES IMAGE INFO IN DATA BASE
const updateImage = async(req,res) => {

}

//DELETES IMAGE FROM DATA BASE
const removeImage = async(req,res) => {
}

//EXPORT OF CONTROLERS
module.exports = {
    getAllImages,
    addImage,
    updateImage,
    removeImage
}