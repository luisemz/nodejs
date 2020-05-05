import express from "express";
import sessionController from "./session.controller";

const API_SESSION = express.Router();

API_SESSION.post("/session", sessionController.createSession);
API_SESSION.delete("/session", sessionController.deleteSession);

export default API_SESSION;
