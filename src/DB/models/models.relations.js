import user from "./Users.model.js";
import post from "./Posts.model.js";
import blog from "./Blogs.model.js";
import comment from "./Comments.model.js";

post.hasMany(comment, { foreignKey: "postId", onDelete: "CASCADE" });
comment.belongsTo(post, { foreignKey: "postId", onUpdate: "CASCADE" });

user.hasMany(comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
comment.belongsTo(user, { foreignKey: 'userId' });

user.hasMany(blog, { foreignKey: "userId", onDelete: "CASCADE" });
blog.belongsTo(user, { foreignKey: "userId" });

user.hasMany(post, { foreignKey: 'userId', onDelete: 'CASCADE' });
post.belongsTo(user, { foreignKey: 'userId' });


blog.hasMany(post, { foreignKey: "blogId"});
post.belongsTo(blog, { foreignKey: "blogId" });

export { user, comment, post, blog };
