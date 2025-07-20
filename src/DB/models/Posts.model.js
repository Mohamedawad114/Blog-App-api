import { sequelize_config } from "../db.connection.js";
import {DataTypes} from 'sequelize';
import blog from "./Blogs.model.js";
import user from "./Users.model.js";
import fs from 'fs/promises'
import path from'path'
export const post=sequelize_config.define(
    "post",{
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        type:{
            type:DataTypes.ENUM("image","video","text"),
            allowNull:false
        },
        blogId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:blog,
                key:"id"
            }
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:user,
                key:"id"
            }
        },
        fileUrl:{
            type:DataTypes.STRING,
            }
    
    },
    {
        timestamps:true,
        paranoid:true,
        hooks:{
            beforeDestroy:async(post,options)=>{
                if(post.fileUrl){
                    try{
                    const filePath=path.join(process.cwd(),post.fileUrl)
                    await fs.unlink(filePath)
                        console.log('deleted')
                    }catch(err){
                        console.log(`error:${err}`)
                    }
                }
            }
        }
    }
)
export default post