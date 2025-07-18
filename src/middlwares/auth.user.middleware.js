import jwt from'jsonwebtoken'
import env from 'dotenv'
env.config()
const key=process.env.KEY

function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; 
    if(!token) return res.status(400).json({message:'no token provided'})
        try{
    const decoded=jwt.verify(token,key)
    req.user=decoded
    next();
  
}catch{
     return res.status(400).json({message:'no token provided'})
}}


export const authorizationUser=(req,res,next)=>{   ///update user/deleteuser....createblog||updateblog||create post
verifyToken(req,res,()=>{
    if(req.user.id==req.params.id||req.user.id==req.body.userId){ 
        next();
    }
    else{
    return res.status(401).json({message: 'You are not allowed to perform this action'})
    }
})
}
export const authorizationUserOrAdmin=(req,res,next)=>{  //اى delete 
verifyToken(req,res,()=>{
    if(req.user.id||req.user.isAdmin){ 
        next();
    }
    else{
    return res.status(401).json({message: 'You are not allowed to perform this action'})
    }
})
}

export const validationAdmin=(req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next();
    }
    else{
      return res.status(403).json({message: `only admind allowed`})
    }
  })
}

export default verifyToken