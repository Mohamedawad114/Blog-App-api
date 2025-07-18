import {sequelize_config} from "../db.connection.js";
import {DataTypes} from "sequelize" 
export const user= sequelize_config.define(
   "user",
    {
        name:{
            type:DataTypes.STRING(25),
            allowNull:false,
            validate:{
                namelength(value){
                    if (value.length<=2){
                        throw Error(`the name must be greater than 2`)
                    }
                }
            }
        },
        user_name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate: {
                is: /^[A-Za-z0-9@#&*_]+$/
            }
            },
        email:{
            type:DataTypes.STRING(200),
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                checkPasswordLength(value){
                    if(value.length<=6){
                        throw Error(`password must be longer than 6`)
                    }
                }
                
            }
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
    },
    {
        timestamps:true,
        createdAt:true,
        updatedAt:true,
        indexes:[{
            name:"email_valid",
            unique:true,
            fields:["email"]
        },{
            name:"valid_userName",
            fields:["user_name"],
            unique:true
        }],
        hooks:{
        beforeCreate:(user,options)=>{
            user.email=user.email.toLowerCase()
            
        }
    }}
)
export default user