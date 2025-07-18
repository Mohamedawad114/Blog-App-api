import express from 'express'
import helmet from 'helmet'
import env from 'dotenv'
import db_connection from './DB/db.connection.js';
import user_controllor from './modules/Users/users.controllor.js'
import blog_controllor from './modules/Blogs/blog.controllor.js'
import post_controllor from './modules/Posts/posts.controllor.js'
import comment_controllor from './modules/Comments/comment.controllor.js'

const app=express();
app.use(helmet())
env.config()
let port=process.env.PORT||3000;

app.use(express.json())



app.use('/users',user_controllor)
app.use('/Blogs',blog_controllor)
app.use('/posts',post_controllor)
app.use('/comments',comment_controllor)



await db_connection()



app.use((err, req, res, next) => {
  res.status(500).send(`something wrong: ${err.message}`);
});

app.listen(port,()=>{
    console.log(`port ${port} is running....`)
})