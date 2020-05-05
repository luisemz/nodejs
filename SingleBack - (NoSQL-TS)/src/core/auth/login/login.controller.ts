import jwt from "jsonwebtoken";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { Request, Response } from "express";

import {
  JWT_LIFETIME,
  JWT_SECRET,
  JWT_ALGORITHM
} from "../../../config/initializer";

import { IUser, IPayload } from "../../api/user/user.model";

import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../../utils/httpErrors";
import { getFullDateMilliseconds } from "../../../utils/dateFormats";

const login = (req: Request, res: Response) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: IUser, info: IVerifyOptions) => {
      if (err) {
        console.error(err.stack);
        INTERNAL_SERVER_ERROR(res, `Error login User: ${err.message}`);
      } else if (info) {
        BAD_REQUEST(res, info.message);
      } else {
        const PAYLOAD: IPayload = {
          sub: user._id,
          name: user.name,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
          exp: getFullDateMilliseconds({ hours: Number(JWT_LIFETIME) })
        };
        const TOKEN = jwt.sign(JSON.stringify(PAYLOAD), JWT_SECRET, {
          algorithm: <any>JWT_ALGORITHM
        });
        res.status(201).json({ data: TOKEN });
      }
    }
  )(req, res);
};

export default { login };
