export{}
const express = require('express')
const router = express.Router()
//CONTROLERS
const {getAllImages, addImage, updateImage, removeImage } = require("../controlers/image-controls")
const {getUserByUserName, getUser, getUserByEmail, createUser, updateUser, deleteUser} = require("../controlers/user-controls")


// REQUEST ROUTES
router.route('/login_register').get(getUserByEmail).post(createUser)
router.route('/users/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/users/get-by-username/:id').get(getUserByUserName)
router.route('/images').get(getAllImages).post(addImage)
router.route('/images/:image-id').patch(updateImage).delete(removeImage)

module.exports = router