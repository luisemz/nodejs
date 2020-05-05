import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import passport from "passport";

import appRouter from "./router";
import webSocket from "./socket";
import passportConfig from "./auth/passport";

const APP = express(),
  SERVER = http.createServer(APP);

passportConfig(passport);

APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
APP.use(passport.initialize());
APP.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
);

appRouter(APP);
webSocket(SERVER);

export default SERVER;
