import user from "../../../DB/models/Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { validationLogin,validationupdate,validationsignup } from "../users.validator.js";

export const signup=asyncHandler(
    async(req,res)=>{
        const salt=await bcrypt.genSalt(10)
        const {name,user_name,password,email,isAdmin}=req.body;
        if(!name||!user_name||!password||!email) return res.status(400).json({message:`All inputs is required`})
        const {error,value}=validationsignup(req.body)
    if(error)return res.status(400).json({ message: error.details[0].message })
        const valid_email=await user.findOne({where:{email:email}})
    if(valid_email) return res.status(409).json({message:'Email is already existed'})
        const existingUsername = await user.findOne({ where: { user_name } });
    if (existingUsername) return res.status(409).json({ message: 'Username is already used' });
        const hash_password= await bcrypt.hash(password,salt);
    const save_user=await user.create( {name,user_name,password:hash_password,email,isAdmin})
    if(save_user) return res.status(201).json({message:'sign up seccussfully'})
    return res.status(500).json({message:'some thing wrong'})
    }
)
export const loginuser=asyncHandler(
    async(req,res)=>{
        const key=process.env.KEY
        const {password,email}=req.body
        if(!email||!password) return res.status(400).send(`email and password required`)
        const { error, value } =validationLogin(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });
        const valid_user=await user.findOne({where:{email:email}})
    if(!valid_user) return res.status(404).json({message:`Email is not found`})
        const matchPass= await bcrypt.compare(req.body.password,valid_user.password)
    if(!matchPass)return res.status(400).send(`invalid password`)
    const token=jwt.sign({id:valid_user.id,user_name:valid_user.user_name,isAdmin:valid_user.isAdmin},key)
    return res.status(200).json({message:`login successfully , token: ${token}`})
    }
)
export const updateuser=asyncHandler(
    async(req,res)=>{
        const salt=await bcrypt.genSalt(10)
        const userId=req.user.id
        const {name,user_name,password,email}=req.body;
        const valid_user=await user.findOne({where:{id:userId}})
        if(!valid_user) return res.status(404).json({message:'user not found'})
        const {error,value}=validationupdate(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message });
    if(name) valid_user.name=name;
    if(user_name) valid_user.user_name=user_name;
    if(password){const hash_password=await bcrypt.hash(password,salt)
    valid_user.password=hash_password}
    if(email){
        const valid_email=await user.findOne({where:{email:email}})
        if(valid_email&& valid_email.id !==userId) return res.status(409).json({message:'conflict email please change it'})
        valid_user.email=email
    }
    const updated=await valid_user.save()
    if(updated) return res.status(200).json({message:'user updated seccussfully'})
        return res.status(500).json({message:'some thing wrong'})
    }
)

export const deleteuser=asyncHandler(
    async(req,res)=>{
        const authUserId=req.user.id
        if(!req.user.isAdmin){
            const ownuser=await user.findOne({where:{id:authUserId}})
        const deleted=await ownuser.destroy()
        if(deleted) return res.status(200).json({message:'user deleted seccussfully'})}
        else{
        const userId=req.body.userId
        console.log(userId)
        if(!userId) return res.status(400).json({message:'userId is required'})
        const valid_user=await user.findOne({where:{id:userId}})
        if(!valid_user) return res.status(404).json({message:'user not found'})
        if (parseInt(userId) === authUserId) {
        return res.status(400).json({ message: "Admin can't delete themselves" });
    }
        const isdeleted=await valid_user.destroy()
        if(isdeleted) return res.status(200).json({message:'user deleted seccussfully'})}
            return res.status(500).json({message:'something wrong'})
    }
)
export const alluser=asyncHandler(
    async(req,res)=>{
        const page_num=parseInt(req.query.page)
        const limituser=3;
        const offest=(page_num-1)*limituser
        const users=await user.findAll({limit:limituser,offset:offest,attributes:{exclude:["password"]}})
        return res.status(200).json({users})
        return res.status(500).json({message:'some thing wrong'})
    }
)
export const getuser=asyncHandler(
    async(req,res)=>{
        const userId=req.params.id
        if(!userId) return res.status(400).json({message:'userId is required'})
            const valid_user=await user.findOne({where:{id:userId},attributes:{exclude:["email","password","createdAt","isAdmin"]}})
        if(valid_user) return res.status(200).json({valid_user})
            if(!valid_user) return res.status(404).json({message :'user not found'})
        
    }
)