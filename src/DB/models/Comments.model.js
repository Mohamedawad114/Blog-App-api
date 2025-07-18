import { sequelize_config } from "../db.connection.js";
import {DataTypes} from 'sequelize';
import post from "./Posts.model.js";
import user from "./Users.model.js";

export const comment=sequelize_config.define(
    "comment",
    {
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        type:{
            type:DataTypes.ENUM("image","video","text"),
            allowNull:false
        },
        postId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:post,
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
    },{
        timestamps:true
    }
)
export default comment