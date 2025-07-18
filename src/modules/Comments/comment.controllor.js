import express from "express";
import { verifycommentOwnerOradmin,verifypostOwn } from "../../middlwares/auth.comment.middleware.js";
import verifyToken from "../../middlwares/auth.user.middleware.js";
import upload from "../../middlwares/upload.posts.js";
import * as comment_serv from "./servies/comments.servies.js";
const controllor = express.Router();

controllor.post("/addcomment",upload.single('image'),verifyToken,comment_serv.sharecomment);
controllor.put("/:postId/editcomment/:commentId",verifypostOwn, comment_serv.editcomment);
controllor.delete("/:postId/delete/:commentId",verifycommentOwnerOradmin,comment_serv.deletecomment);
controllor.get("/:postId/allcomment",comment_serv.allcomment);

export default controllor;