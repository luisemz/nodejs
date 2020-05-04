import express from "express";
import userControler from "./user.controller";

const API_USER = express.Router();

API_USER.get("/select", userControler.selectAllUser);
API_USER.get("/select/:id", userControler.selectUser);
API_USER.post("/create", userControler.createUser);
API_USER.put("/update/:id", userControler.updateUser);
API_USER.delete("/delete/:id", userControler.deleteUser);

export default API_USER;
