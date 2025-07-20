import asyncHandler from 'express-async-handler'
import post from '../../../DB/models/Posts.model.js'
import blog from '../../../DB/models/Blogs.model.js'


export const sharepost=asyncHandler(
    async(req,res)=>{
    const {blogId,content,type}=req.body
    const userId=req.user.id
    console.log(userId)
if(!content||!type) return res.status(400).send('All input is required')
    if(type==="text"){const shared=await post.create({blogId,content,type,userId})
return res.status(201).json({message:'post shared'})}
if(type=== 'image'){
const imageFile = req.files?.image[0];
if(!imageFile) return res.status(400).send(` NO files upload`)
    const fileUrl=(`images/${imageFile.filename}`)
const shared=await post.create({blogId,content,type,userId,fileUrl})
return res.status(201).json({message:'post shared'})
    }
if(type=== 'video'){
const videoFile = req.files?.video[0];
if(!videoFile) return res.status(400).send(` NO files upload`)
    const fileUrl=(`videos/${videoFile.filename}`)
const shared=await post.create({blogId,content,type,userId,fileUrl})
return res.status(201).json({message:'post shared'})
    }
    return res.status(400).json({ message: 'Unsupported post type' })
})

export const editpost=asyncHandler(
    async(req,res)=>{
        const {content}=req.body
        const postId=parseInt(req.params.postId)
        if(!postId) return res.status(400).send('postId is required')
    const valid_post=await post.findOne({where:{id:postId}})
if(!valid_post) return res.status(400).json({message:'post not found'})
    if(content) valid_post.content=content
const Edited=await valid_post.save()
if(Edited) return res.status(200).json({message:`post edited`})
    return res.status(500).json({message:'something wrong'})
    }
)

export const deletepost=asyncHandler(
    async(req,res)=>{
        const postId=parseInt(req.params.postId)
        if(!postId) return res.status(400).send('postId is required')
    const valid_post=await post.findOne({where:{id:postId}})
    if(!valid_post) return res.status(400).json({message:'post not found'})
    const deleted=await valid_post.destroy()
    if(deleted)return res.status(200).json({message:'post deleted'})
    return res.status(500).json({message:'something wrong'})
    }
)

export const allposts=asyncHandler(
    async(req,res)=>{
        const blogId=parseInt(req.params.blogId)
        const valid_blog= await blog.findOne({where:{id:blogId}})
        if(!valid_blog) return res.status(404).json({message:'Blog not fornd'})
        const page_num=req.query.page
        const limituser=5;
        const offest=(page_num-1)*limituser
        const posts=await post.findAll({where:{blogId:blogId},attributes:{exclude:["blogId"]},limit:limituser,offset:offest})
        if(posts) return res.status(200).json({posts})
        return res.status(500).json({message:'something wrong'})
    }
)
export const getpost=asyncHandler(
    async(req,res)=>{
        const postId=req.params.id
        if(!postId) return res.status(400).json({message:'postId is required'})
            const postSearched=await post.findOne({where:{id:postId},attributes:{exclude:["deletedAt","updatedAt"]}})
        if(postSearched) return res.status(200).json({postSearched})
            if(!postSearched) return res.status(404).json({message :'post not found'})
        
    }
)