import { sequelize_config } from "../db.connection.js";
import {DataTypes} from "sequelize"
import user from './Users.model.js'
export const blog=sequelize_config.define(
    "blog",{
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
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
        paranoid:true,
        timestamps:true,
    }
)
export default blog;