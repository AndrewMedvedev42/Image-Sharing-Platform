const emailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidation = /^\S+$/

const UserModel = require("../models/user.model")

//POSTS NEW USER INTO DATA BASE
const createUser = async(req,res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//GETS USER FROM DATA BASE
const getUser = async(req,res) => {   
    try {
        const {id:Id} = req.params

        const user = await UserModel.findOne({_id:Id})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getUserByUserName = async(req,res) => {
    try {
        const {username:userName} = req.params
        const user = await UserModel.findOne({userName:userName})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//GETS USER FROM DATA BASE BY EMAIL
const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body
        if (email.match(emailValidation)) {
            if (password.match(passwordValidation)) {                
                const user = await UserModel.findOne({email:email})
                if(!user){
                    return res.status(404).json({msg:'User not found'})
                }
                if (user.password === password) {
                    delete user.password;    
                    delete user.imageList
                    return res.status(200).json({user})
                } else {   
                    return res.status(404).json({msg:"Password is incorrect, please try again."})
                }
            }else{
                res.status(404).json({msg:"Password is typed incorrectly, please try again."})
            }
        } else {
            res.status(404).json({msg:"Email is typed incorrectly, please try again."})
        }
    } catch (error) {
        res.status(404).json({msg:error})
    }
}

//UPDATES USER IN DATA BASE
const updateUser = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await UserModel.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        if(!user){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json("")
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//DELETES USER FROM DATA BASE
const deleteUser = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const user = await UserModel.findOneAndDelete({_id:taskID})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//EXPORT OF CONTROLERS
module.exports = {
    getUserByUserName,
    createUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser
}