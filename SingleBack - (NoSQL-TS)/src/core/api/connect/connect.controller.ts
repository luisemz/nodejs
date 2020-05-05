import { Request, Response } from "express";

import Session from "../../auth/session/session.model";

import { findAndCountPaginate } from "../../utils/database/getData";
import { IFindResult } from "../../utils/database/interfaces";

import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../utils/httpErrors";

const findAllSessions = (req: Request, res: Response) => {
  const { page = "1", pageSize = "10" } = req.query;

  findAndCountPaginate(Session, {
    query: {},
    populate: {
      path: "user",
      match: {},
      select: "username email name lastName role birthday"
    },
    page: Number(page),
    pageSize: Number(pageSize)
  })
    .then((response: Partial<IFindResult>) => {
      res.status(200).json(response);
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error finding sessions: ${err.message}`);
    });
};

const deleteSession = (req: Request, res: Response) => {
  const { id } = req.params;

  Session.findByIdAndRemove(id, (err: Error, session) => {
    if (err) {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, `Error deleting Session: ${err.message}`);
    } else if (!session) {
      NOT_FOUND(res, `Session with ID:${id} not found`);
    } else {
      res.status(200).json({
        data: session._id,
        message: `Session with ID:${id} deleted successfuly`
      });
    }
  });
};

export default { findAllSessions, deleteSession };
