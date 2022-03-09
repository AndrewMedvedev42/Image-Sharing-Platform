export{}
const express = require('express')
const router = express.Router()
//CONTROLERS
const {getAllImages, addImage, updateImage, removeImage} = require("../controlers/image-controls")
const {getUserByUserName, getUser, loginUser, createUser, updateUser} = require("../controlers/user-controls")

// REQUEST ROUTES
router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/users/:id').get(getUser).patch(updateUser)
router.route('/users/user-names/:username').get(getUserByUserName)
router.route('/images').get(getAllImages)
router.route('/images/:userID').post(addImage)
router.route('/images/:user_id/:image_id').patch(updateImage).delete(removeImage)

module.exports = router