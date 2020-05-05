import { Model } from "mongoose";
import { IUser, UserDoc } from "../../api/user/user.model";
import { ISession, SessionDoc } from "../../auth/session/session.model";

type FindDataInput = Model<UserDoc | SessionDoc>;
type FindDataResult = IUser | ISession;

interface IFindPaginate {
  page: number;
  pageSize: number;
  query: {};
  populate: IPopulate | [IPopulate];
}

interface IFindAll {
  query: {};
  populate: IPopulate | [IPopulate];
}

interface IPopulate {
  path: string;
  match: object;
  select: string;
}

interface IFindCount {
  query: {};
}

interface IFindResult {
  dataCount: Partial<IResultCount>;
  data: [IUser | ISession];
}

interface IResultCount {
  count: number;
  pagesNumber: number;
}

export {
  FindDataInput,
  FindDataResult,
  IFindPaginate,
  IFindAll,
  IFindCount,
  IFindResult
};
