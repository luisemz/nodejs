import express from "express";
import connectControler from "./connect.controller";

const API_CONNET = express.Router();

API_CONNET.get("/select", connectControler.findAllSessions);
API_CONNET.delete("/delete/:id", connectControler.deleteSession);

export default API_CONNET;
