export{}
const express = require('express')
const router = express.Router()
var multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

//CONTROLERS
const {getAllImages, addImage, updateImage, removeImage } = require("../controlers/image-controls")
const {getUserByUserName, getUser, getUserByEmail, createUser, updateUser, deleteUser} = require("../controlers/user-controls")


// REQUEST ROUTES
router.route('/login_register').get(getUserByEmail).post(createUser)
router.route('/users/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/users/get-by-username/:id').get(getUserByUserName)
router.route('/images').get(getAllImages).post(addImage, upload.single('image'))
router.route('/images/:image-id').patch(updateImage).delete(removeImage)

module.exports = router