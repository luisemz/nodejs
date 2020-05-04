import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import appRouter from "./router";

const APP = express(),
  SERVER = http.createServer(APP);

APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
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

export default SERVER;
