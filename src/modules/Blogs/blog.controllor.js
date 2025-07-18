import {
  authorizationUser,
  authorizationUserOrAdmin,
  validationAdmin,
} from "../../middlwares/auth.user.middleware.js";
import * as blog_serv from "./servies/blog.servies.js";
import verifyToken from "../../middlwares/auth.user.middleware.js";
import express from "express";
const controllor = express.Router();

controllor.post("/createblog", authorizationUser, blog_serv.create_blog);
controllor.put("/update/:id", verifyToken, blog_serv.updateBlog);
controllor.delete("/delete/:id", verifyToken, blog_serv.deleteblog);
controllor.get("/userBlogs", verifyToken, blog_serv.getUserBlogs);
controllor.get("/allBlogs", validationAdmin, blog_serv.allblogs);

export default controllor;
