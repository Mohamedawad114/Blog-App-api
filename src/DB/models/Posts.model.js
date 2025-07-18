import { sequelize_config } from "../db.connection.js";
import {DataTypes} from 'sequelize';
import blog from "./Blogs.model.js";
import user from "./Users.model.js";
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
        }
    },
    {
        timestamps:true,
        paranoid:true
    }
)
export default post