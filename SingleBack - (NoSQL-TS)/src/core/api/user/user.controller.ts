import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User, { userImportData, IUser } from "./user.model";

import { findAndCountPaginate, find } from "../../utils/database/getData";
import { IFindResult, FindDataResult } from "../../utils/database/interfaces";

import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST
} from "../../utils/httpErrors";
import { getFullDate } from "../../../utils/dateFormats";

const selectAllUsers = (req: Request, res: Response) => {
  const { page = "1", pageSize = "10" } = req.query;

  findAndCountPaginate(User, {
    query: {},
    populate: {
      path: "",
      match: {},
      select: ""
    },
    page: Number(page),
    pageSize: Number(pageSize)
  })
    .then((response: Partial<IFindResult>) => {
      res.status(200).json(response);
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error finding Users: ${err.message}`);
    });
};

const selectUser = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id, (err: Error, user) => {
    if (err) {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error finding User: ${err.message}`);
    } else if (!user) {
      NOT_FOUND(res, `User with ID:${id} not found`);
    } else {
      res.status(200).json({ data: user });
    }
  });
};

const createUser = (req: Request, res: Response) => {
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
            INTERNAL_SERVER_ERROR(res, `Error created User: ${err.message}`);
          } else {
            res.status(201).json({
              data: user._id,
              message: `User registered successfuly with ID:${user._id}`
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

const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;

  let body: IUser = req.body;
  body.updateDate = new Date(getFullDate());

  let data = userImportData(body);

  User.findByIdAndUpdate(id, data, (err: Error, user) => {
    if (err) {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error updating User: ${err.message}`);
    } else if (!user) {
      NOT_FOUND(res, `User with ID:${id} not found`);
    } else {
      res.status(200).json({
        data: id,
        message: `User with ID:${id} updated successfuly`
      });
    }
  });
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err: Error, user) => {
    if (err) {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error deleting User: ${err.message}`);
    } else if (!user) {
      NOT_FOUND(res, `User with ID:${id} not found`);
    } else {
      res.status(200).json({
        data: user._id,
        message: `User with ID:${id} deleted successfuly`
      });
    }
  });
};

export default {
  selectAllUsers,
  selectUser,
  createUser,
  updateUser,
  deleteUser
};
