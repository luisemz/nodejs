import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { Request, Response, NextFunction } from "express";

import { IUser } from "../api/user/user.model";
import Session, { ISession } from "../auth/session/session.model";

import { find } from "../utils/database/getData";
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../utils/httpErrors";

const authLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IUser, info: IVerifyOptions) => {
      if (err) {
        console.error(err.stack);
        INTERNAL_SERVER_ERROR(res, `Error validated token: ${err.message}`);
      } else if (info) {
        BAD_REQUEST(res, info.message);
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

const authSession = (req: Request, res: Response, next: NextFunction) => {
  const user = <IUser>req.user;
  find(Session, {
    query: { user: user._id },
    populate: { path: "", match: {}, select: "" }
  })
    .then(sessions => {
      let [session] = <[ISession]>sessions;
      if (!session) BAD_REQUEST(res, "Session doesn't exist");
      else next();
    })
    .catch((error: Error) => {
      console.error(error.stack);
      INTERNAL_SERVER_ERROR(res, `Error validated session: ${error.message}`);
    });
};

const authPermission = (role: string, action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};

export { authLogin, authSession, authPermission };
