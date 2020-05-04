import { Express } from "express";
import userRouter from "./user/user.router";

const API_BASE = "/api";

export default (App: Express) => {
  App.use(`${API_BASE}/user`, userRouter);
};
