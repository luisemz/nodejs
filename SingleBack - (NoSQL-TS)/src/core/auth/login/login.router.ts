import express from "express";
import loginController from "./login.controller";

const API_LOGIN = express.Router();

API_LOGIN.post("/login", loginController.login);

export default API_LOGIN;
