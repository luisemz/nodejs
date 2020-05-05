import { Request, Response } from "express";

import Session, { ISession } from "./session.model";
import { IUser } from "../../api/user/user.model";

import { find } from "../../utils/database/getData";
import { FindDataResult } from "../../utils/database/interfaces";

import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../../utils/httpErrors";
import { getFullDate } from "../../../utils/dateFormats";

const createSession = (req: Request, res: Response) => {
  const user = <IUser>req.user;

  find(Session, {
    query: { user: user._id },
    populate: { path: "", match: {}, select: "" }
  })
    .then((sessions: [FindDataResult]) => {
      let [session] = <[ISession]>sessions;
      if (!session) {
        const data: Partial<ISession> = {
          user: user._id,
          creationDate: new Date(getFullDate())
        };

        let newSession = new Session(data);

        newSession.save((err: Error, session: Partial<ISession>) => {
          if (err) {
            console.error(err.stack);
            INTERNAL_SERVER_ERROR(res, `Error create Session: ${err.message}`);
          } else {
            res.status(201).json({
              data: session._id,
              message: `Session created successfuly`
            });
          }
        });
      } else {
        BAD_REQUEST(
          res,
          `Session for ${user.username.toLowerCase()} already exist`
        );
      }
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error finding session: ${err.message}`);
    });
};

const deleteSession = (req: Request, res: Response) => {
  const user = <IUser>req.user;

  Session.findOneAndRemove({ user: user._id }, (err: Error, session) => {
    if (err) {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error deleting Session: ${err.message}`);
    } else if (!session) {
      BAD_REQUEST(res, "Session doesn't exist");
    } else {
      res.status(200).json({
        data: session._id,
        message: `Sesion deleted successfuly`
      });
    }
  });
};

export default { createSession, deleteSession };
