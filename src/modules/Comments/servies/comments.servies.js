import asyncHandler from 'express-async-handler'
import comment from '../../../DB/models/Comments.model.js'
import post from '../../../DB/models/Posts.model.js'


export const sharecomment=asyncHandler(
    async(req,res)=>{
    const {postId,content,type}=req.body
if(!content||!type ||!postId) return res.status(400).send('All input is required')
    const valid_post=await post.findByPk(postId)
if(!valid_post) return res.status(404).json({message:'post not found'})
    if(type==="text"){const shared=await comment.create({postId,content,type,userId:req.user.id})
return res.status(201).json({message:'comment shared'})}
if(type=== 'image'){
const imageFile = req.file;
if(!imageFile) return res.status(400).send(` NO files upload`)
    const fileUrl=(`images/${imageFile.filename}`)
const shared=await comment.create({postId,content,type,userId:req.user.id,fileUrl})
return res.status(201).json({message:'comment shared'})
    }
    return res.status(400).json({ message: 'Unsupported comment type' })
})

export const editcomment=asyncHandler(
    async(req,res)=>{
        const {content}=req.body
        const commentId=parseInt(req.params.commentId)
        if(!commentId) return res.status(400).send('commentId is required')
    const valid_comment=await comment.findOne({where:{id:commentId}})
    if(!valid_comment) return res.status(400).json({message:'comment not found'})
    if(content) valid_comment.content=content
const Edited=await valid_comment.save()
if(Edited) return res.status(200).json({message:`comment edited`})
    return res.status(500).json({message:'something wrong'})
    }
)

export const deletecomment=asyncHandler(
    async(req,res)=>{
        console.log(req.user)
        const commentId=parseInt(req.params.commentId)
        if(!commentId) return res.status(400).send('commentId is required')
    const valid_comment=await comment.findOne({where:{id:commentId}})
    if(!valid_comment) return res.status(400).json({message:'comment not found'})
    const deleted=await valid_comment.destroy()
    if(deleted)return res.status(200).json({message:'comment deleted'})
    return res.status(500).json({message:'something wrong'})
    }
)

export const allcomment=asyncHandler(
    async(req,res)=>{
        const pageNum=parseInt(req.query.page)
        const postId=parseInt(req.params.postId)
        const limit=6; 
        const offest=(pageNum-1)*limit
        const comments=await comment.findAll({where:{postId:postId},limit:limit,offset:offest,order:[['createdAt','DESC']]})
        if(comments) return res.status(200).json({comments})
        return res.status(500).json({message:'something wrong'})
    }
)