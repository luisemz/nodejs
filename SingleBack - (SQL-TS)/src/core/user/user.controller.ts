import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Users } from "../../database/entity/Users";

import { USER_DB, DB_HOST, DB_NAME } from "../../config/initializer";

const selectAllUser = (req: Request, res: Response) => {
  const { page = "1", pageSizes = "10" } = req.query;
  createConnection({
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    logging: false
  })
    .then(connection => {
      let userRepository = connection.getRepository(Users);

      userRepository
        .findAndCount({
          skip: (Number(page) - 1) * Number(pageSizes),
          take: Number(pageSizes)
        })
        .then(data => {
          const pages = Math.ceil(data[1] / Number(pageSizes));
          res.status(200).json({
            countData: { count: data[1], pages: pages },
            data: data[0]
          });
        })
        .catch((err: Error) => {
          console.error(err.stack);
          INTERNAL_SERVER_ERROR(res, err.message);
        })
        .finally(() => {
          connection.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, err.message);
    });
};

const selectUser = (req: Request, res: Response) => {
  const { id } = req.params;

  createConnection({
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    logging: false
  })
    .then(connection => {
      let userRepository = connection.getRepository(Users);

      userRepository
        .findOneOrFail(id)
        .then(userFound => res.status(200).json({ data: userFound }))
        .catch((err: Error) => {
          console.error(err.stack);
          INTERNAL_SERVER_ERROR(res, err.message);
        })
        .finally(() => {
          connection.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, err.message);
    });
};

const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, years } = req.body;

  createConnection({
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    logging: false
  })
    .then(connection => {
      let newUser = new Users();

      newUser.first_name = firstName;
      newUser.last_name = lastName;
      newUser.years = years;
      newUser.created_on = new Date();

      connection.manager
        .save(newUser)
        .then(user => {
          res.status(201).json({ id: user.id });
        })
        .catch((err: Error) => {
          console.error(err.stack);
          INTERNAL_SERVER_ERROR(res, err.message);
        })
        .finally(() => {
          connection.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, err.message);
    });
};

const updateUser = (req: Request, res: Response) => {
  const { id, firstName, lastName, years } = req.body;

  createConnection({
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    logging: false
  })
    .then(async connection => {
      let userRepository = connection.getRepository(Users);

      let user = await userRepository.findOneOrFail(id);
      if (firstName) user.first_name = firstName;
      if (lastName) user.last_name = lastName;
      if (years) user.years = years;

      userRepository
        .save(user)
        .then(userUpdated =>
          res.status(200).json({
            message: `User with id = ${userUpdated.id} updated successfuly!`
          })
        )
        .catch((err: Error) => {
          console.error(err.stack);
          INTERNAL_SERVER_ERROR(res, err.message);
        })
        .finally(() => {
          connection.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, err.message);
    });
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  createConnection({
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    logging: false
  })
    .then(async connection => {
      let userRepository = connection.getRepository(Users);

      let user = await userRepository.findOneOrFail(id);

      userRepository
        .delete(user)
        .then(userDeleted =>
          res.status(200).json({
            message: `User with id = ${userDeleted} deleted successfuly!`
          })
        )
        .catch((err: Error) => {
          console.error(err.stack);
          INTERNAL_SERVER_ERROR(res, err.message);
        })
        .finally(() => {
          connection.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
      INTERNAL_SERVER_ERROR(res, err.message);
    });
};

const INTERNAL_SERVER_ERROR = (res: Response, message: string) => {
  res.status(500).json({
    error: "InternalServerError",
    status: 500,
    message: message
  });
};

export default {
  selectAllUser,
  selectUser,
  createUser,
  updateUser,
  deleteUser
};
