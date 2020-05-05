import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User, { userImportData, IUser } from "../../api/user/user.model";

import { find } from "../../utils/database/getData";
import { FindDataResult } from "../../utils/database/interfaces";

import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../../utils/httpErrors";
import { getFullDate } from "../../../utils/dateFormats";

const register = (req: Request, res: Response) => {
  let body: IUser = req.body;

  find(User, {
    query: { $or: [{ username: body.username }, { email: body.email }] },
    populate: { path: "", match: {}, select: "" }
  })
    .then(async (users: [FindDataResult]) => {
      let [user] = <[IUser]>users;

      if (!user) {
        body.creationDate = new Date(getFullDate());
        body.updateDate = new Date(getFullDate());
        body.password = await bcrypt.hash(body.password, 10);

        let data = userImportData(body);

        const newUser = new User(data);

        newUser.save((err: Error, user) => {
          if (err) {
            console.error(err.stack);
            INTERNAL_SERVER_ERROR(res, `Error register User: ${err.message}`);
          } else {
            res.status(201).json({
              data: user._id,
              message: `User registered successfuly`
            });
          }
        });
      } else {
        BAD_REQUEST(
          res,
          `User (${body.username.toLowerCase()} - ${body.email.toLowerCase()}) already exist`
        );
      }
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error finding user: ${err.message}`);
    });
};

export default { register };
