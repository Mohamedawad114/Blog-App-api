import express from "express";
import {
  verifyBlogOwner,
  verifyBlogOwnerOradmin,
} from "../../middlwares/auth.blog.middleware.js";
import upload from "../../middlwares/upload.posts.js";
import * as post_serv from "./servies/post.servies.js";
import verifyToken from "../../middlwares/auth.user.middleware.js";
const controllor = express.Router();

controllor.post(
  "/addpost",
  verifyToken,
  upload.fields([{ name: "image" }, { name: "video" }]),
  verifyBlogOwner,
  post_serv.sharepost
);
controllor.put(
  "/:blogId/editpost/:postId",
  verifyBlogOwner,
  post_serv.editpost
);
controllor.delete(
  "/:blogId/delete/:postId",
  verifyBlogOwnerOradmin,
  post_serv.deletepost
);
controllor.get("/:blogId/allposts", post_serv.allposts);
controllor.get("/search/:id", post_serv.getpost);

export default controllor;
