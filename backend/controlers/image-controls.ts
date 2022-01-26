const User = require("../models/user")
const ImageModel = require("../models/image")

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
const addImage = async(req,res) => {
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