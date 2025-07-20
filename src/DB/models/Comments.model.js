import { sequelize_config } from "../db.connection.js";
import { DataTypes } from "sequelize";
import post from "./Posts.model.js";
import user from "./Users.model.js";
import fs from 'fs/promises'
import path from'path'
export const comment = sequelize_config.define(
  "comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("image", "video", "text"),
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: post,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: "id",
      },
    },
    fileUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (comment, options) => {
        if (comment.fileUrl) {
          try {
            const filePath = path.join(process.cwd(), comment.fileUrl);
            await fs.unlink(filePath);
            console.log("deleted");
          } catch (err) {
            console.log(`error:${err}`);
          }
        }
      },
    },
  }
);
export default comment;
