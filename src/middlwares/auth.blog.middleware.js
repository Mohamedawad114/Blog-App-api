import verifyToken from "./auth.user.middleware.js";
import blog from "../DB/models/Blogs.model.js";

export const verifyBlogOwner = async (req, res, next) => {
  try {
    const blogId = req.body.blogId || parseInt(req.params.blogId);
    if (!blogId) {
      return res.status(400).json({ message: "blogId is required" });
    }
    const valid_blog = await blog.findOne({ where: { id: blogId } });
    if (!valid_blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const ownUser = valid_blog.userId;
    verifyToken(req, res, () => {
      if (req.user.id == ownUser) {
        next();
      } else {
        return res.status(401).json({ message: "you are not authorizated" });
      }
    });
  } catch (err) {
    console.error("verifyBlogOwner error:", err);
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
};
export const verifyBlogOwnerOradmin = async (req, res, next) => {
  try {
    const blogId = parseInt(req.params.blogId);
    if (!blogId) {
      return res.status(400).json({ message: "blogId is required" });
    }
    const valid_blog = await blog.findOne({ where: { id: blogId } });
    if (!valid_blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const ownUser = valid_blog.userId;
    verifyToken(req, res, () => {
      if (req.user.id == ownUser || req.user.isAdmin) {
        next();
      } else {
        return res.status(401).json({ message: "you are not authorizated" });
      }
    });
  } catch (err) {
    console.error("verifyBlogOwner error:", err);
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
};
