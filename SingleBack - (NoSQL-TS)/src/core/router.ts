import { Express } from "express";

import { NODE_ENV } from "../config/initializer";
import debugApp from "../utils/morganDebug";

import { authLogin, authSession } from "./auth/middleware";

import registerRouter from "./auth/register/register.router";
import loginRouter from "./auth/login/login.router";
import sessionRouter from "./auth/session/session.router";
import userRouter from "./api/user/user.router";
import connectRouter from "./api/connect/connect.router";

const API_BASE = "/api",
  AUTH_BASE = "/auth",
  AUTH_MD = [authLogin, authSession];

export default (App: Express) => {
  if (NODE_ENV === "development") {
    App.use(debugApp);
  }
  App.use(`${AUTH_BASE}`, registerRouter);
  App.use(`${AUTH_BASE}`, loginRouter);
  App.use(`${AUTH_BASE}`, authLogin, sessionRouter);
  App.use(`${API_BASE}/user`, AUTH_MD, userRouter);
  App.use(`${API_BASE}/connect`, AUTH_MD, connectRouter);
};
