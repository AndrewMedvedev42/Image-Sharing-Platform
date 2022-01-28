const UserModel = require("../models/user.model")
//GETS ALL USERS FROM DATA BASE
// const getAllUsers = async(req,res) => {
//     const users = User.find({})
//     console.log(users);
//     try {
//         const users = await User.find({})
//         res.status(200).json({users})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

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
    console.log(req.params);
    
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
    console.log(req.params);
    
    try {
        const {id:Id} = req.params

        const user = await UserModel.findOne({userName:Id})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//GETS USER FROM DATA BASE BY EMAIL
const getUserByEmail = async(req,res) => {
    try {
        console.log(req.query);
        
        const {email} = req.query
        const user = await UserModel.findOne({email:email})
        if(!user){
            return res.status(404).json({msg:'NO user WAS FOUND'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//UPDATES USER IN DATA BASE
const updateUser = async(req,res) => {
    try {
        const {id:taskID} = req.params
        const todo = await UserModel.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!todo){
            return res.status(404).json({msg:'NO todo WAS FOUND'})
        }
        res.status(200).json({todo})
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
    getUserByEmail,
    updateUser,
    deleteUser
}