
import post from "../DB/models/Posts.model.js";
import verifyToken from "./auth.user.middleware.js";
import comment from "../DB/models/Comments.model.js";


export const verifypostOwn=async(req,res,next)=>{
    const postId=parseInt(req.params.postId)
    if(!postId) return res.status(400).json({message:'postId is required'})
    const valid_post=await post.findOne({where:{id:postId}})
if(!valid_post) return res.status(404).json({message:'post not found'})
    try{
verifyToken(req,res,()=>{
    const postOwn=valid_post.userId
    if(postOwn ==req.user.id){
        next();
    }
    else{return res.status(401).json({ message: "you are not authorizated" });}
})}catch{
return res.status(401).json({message: 'You are not allowed to perform this action'})
    }
}

export const verifycommentOwnerOradmin = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }
    const valid_post = await post.findOne({ where: { id: postId } });
    if (!valid_post) {
      return res.status(404).json({ message: "post not found" });
    }
    const valid_comment = await comment.findOne({ where: { id:commentId } });
    if (!valid_comment) {
      return res.status(404).json({ message: "comemnt not found" });
    }
    const ownUser = valid_comment.userId;
    verifyToken(req, res, () => {
      if (req.user.id == ownUser || req.user.isAdmin) {
        next();
      } else {
        return res.status(401).json({ message: "you are not authorizated" });
      }
    });
  } catch (err) {
    console.error("verifypostOwner error:", err);
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
};

