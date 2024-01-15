const route = require('express').Router();
const userModel = require('../Models/UsersSchema');
const router = require('./AuthenticationRoute');


router.get('/allusers',async(req,res)=>{
    try{
        const users = await userModel.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/user/:id',async(req,res)=>{
    try{
        const users = await userModel.findById(req.params.id);
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/useritems/:id',async(req,res)=>{
    try{
        const users = await userModel.findById(req.params.id);
        res.status(200).json({items : users.items , status : "success"})
    }catch(err){
        res.status(500).json(err)
    }
});