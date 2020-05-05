import express from "express";
import registerController from "./register.controller";

const API_REGISTER = express.Router();

API_REGISTER.post("/register", registerController.register);

export default API_REGISTER;
