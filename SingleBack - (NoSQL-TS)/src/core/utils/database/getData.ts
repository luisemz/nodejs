import {
  FindDataInput,
  FindDataResult,
  IFindPaginate,
  IFindAll,
  IFindCount,
  IFindResult
} from "./interfaces";

const findAndCountPaginate = (
  Model: FindDataInput,
  data: IFindPaginate
): Promise<IFindResult> => {
  return new Promise((resolve, reject) => {
    count(Model, data)
      .then(count => {
        findPaginate(Model, data)
          .then(response => {
            const pagesNumber: number = Math.ceil(
              Number(count) / Number(data.pageSize)
            );
            resolve({
              dataCount: {
                count,
                pagesNumber
              },
              data: <[FindDataResult]>response.data
            });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const findAndCount = (
  Model: FindDataInput,
  data: IFindAll
): Promise<Partial<IFindResult>> => {
  return new Promise((resolve, reject) => {
    count(Model, data)
      .then(count => {
        find(Model, data)
          .then(response => {
            resolve({
              dataCount: { count },
              data: response
            });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const findPaginate = (
  Model: FindDataInput,
  data: IFindPaginate
): Promise<Partial<IFindResult>> => {
  return new Promise((resolve, reject) => {
    Model.find(data.query, (err: Error, users: [FindDataResult]) => {
      if (err) reject(err);
      else {
        resolve({
          data: users
        });
      }
    })
      .populate(data.populate)
      .skip((data.page - 1) * data.pageSize)
      .limit(data.pageSize);
  });
};

const find = (
  Model: FindDataInput,
  data: IFindAll
): Promise<[FindDataResult]> => {
  return new Promise((resolve, reject) => {
    Model.find(data.query, (err: Error, users: [FindDataResult]) => {
      if (err) reject(err);
      else resolve(users);
    }).populate(data.populate);
  });
};

const count = (Model: FindDataInput, data: IFindCount): Promise<number> => {
  return new Promise((resolve, reject) => {
    Model.countDocuments(data.query, (err: Error, count: number) => {
      if (err) reject(err);
      else resolve(count);
    });
  });
};

export { findAndCountPaginate, findAndCount, findPaginate, find, count };
