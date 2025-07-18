import blog from '../../../DB/models/Blogs.model.js'
import asyncHandler from 'express-async-handler'
import { validationcreate,validationupdate } from '../blog.validator.js'


export const create_blog=asyncHandler(
    async(req,res)=>{
        const {name,userId}=req.body
        if(!name||!userId) return res.status(400).json({message:`All inputs is required`})
        const {error,value}=validationcreate(req.body)
    if(error)return res.status(400).json({ message: error.details[0].message })
        const created=await blog.create({name,userId})
    if(created) return res.status(201).json({message:'Blog created'})
        return res.status(500).json({message:'something wrong'})
    }
)
export const updateBlog=asyncHandler(
    async(req,res)=>{
        const blogId=parseInt(req.params.id)
        const {name}=req.body
        if(!blogId)return res.status(400).json({message:'Blog id is required'})
        const valid_blog=await blog.findOne({where:{id:blogId}})
    if(!valid_blog) return res.status(404).json({message:' Blog not found'})
    if(valid_blog.userId !== req.user.id){return res.status(403).json({message:'you are not allowed to this action'})}
        const{error,valus}=validationupdate(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message })
        if(name) valid_blog.name=name
    const updated=await valid_blog.save()
    if(updated) return res.status(200).json({message:'Blog updated seccussfully'})
        return res.status(500).json({message:'something wrong'})
    }
)
export const deleteblog=asyncHandler(
    async(req,res)=>{
        const blogId=parseInt(req.params.id)
        if(!blogId)return res.status(400).json({message:'Blog id is required'})
        const valid_blog=await blog.findOne({where:{id:blogId}})
        if(!valid_blog) return res.status(404).json({message:' Blog not found'})
            if(valid_blog.userId == req.user.id || req.user.isAdmin){
        const deleted= await valid_blog.destroy()
        return res.status(200).json({message:'Blog deleted'})}
        return res.status(403).json({message:'you are not allowed to this action'})
    }
)
export const getUserBlogs=asyncHandler(
    async(req,res)=>{
        const userId=req.user.id
        const blogs=await blog.findAll({where:{userId:userId}})
        if(blogs)return res.status(200).json({blogs})
        return res.status(500).json({message:'something wrong'})
    }
)
export const allblogs=asyncHandler(
    async(req,res)=>{
 const page_num=parseInt(req.query.page)
        const limituser=5;
        const offest=(page_num-1)*limituser
        const blogs=await blog.findAll({limit:limituser,offset:offest})
        return res.status(200).json({blogs})
        return res.status(500).json({message:'some thing wrong'})
    }
)