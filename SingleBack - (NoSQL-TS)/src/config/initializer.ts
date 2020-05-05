import DotEnv from "dotenv";

DotEnv.config();

const NODE_ENV = process.env.NODE_ENV,
  PORT = process.env.PORT,
  DB_HOST = process.env.DB_HOST,
  DB_PORT = process.env.DB_PORT,
  DB_NAME = process.env.DB_NAME,
  USER_DB = process.env.USER_DB,
  PASS_DB = process.env.PASS_DB,
  JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
  JWT_ALGORITHM = process.env.JWT_ALGORITHM ? process.env.JWT_ALGORITHM : "",
  JWT_LIFETIME = process.env.JWT_LIFETIME ? process.env.JWT_LIFETIME : "";

export {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  USER_DB,
  PASS_DB,
  JWT_SECRET,
  JWT_ALGORITHM,
  JWT_LIFETIME
};
