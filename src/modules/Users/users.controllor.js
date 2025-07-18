import verifyToken, {
  authorizationUser,
  authorizationUserOrAdmin,
  validationAdmin,
} from "../../middlwares/auth.user.middleware.js";
import * as user_serv from "./servies/users.servies.js";
import express from "express";
const controllor = express.Router();

controllor.post("/signup", user_serv.signup);
controllor.post("/login", user_serv.loginuser);
controllor.put("/update", verifyToken, user_serv.updateuser);
controllor.delete("/delete", authorizationUserOrAdmin, user_serv.deleteuser);
controllor.get("/alluser", validationAdmin, user_serv.alluser);
controllor.get("/search/:id",  user_serv.getuser);

export default controllor;
