import { createSchema, typedModel, Type, ExtractDoc } from "ts-mongoose";
import { Types } from "mongoose";
import { getFullDateFromStr } from "../../../utils/dateFormats";

interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  origen: string;
  role: Types.ObjectId;
  birthday: Date;
  creationDate: Date;
  updateDate: Date;
}
interface IPayload {
  sub: Types.ObjectId;
  name: string;
  lastName: string;
  username: string;
  email: string;
  role: Types.ObjectId;
  exp: number;
}

const USER_SCHEMA = createSchema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  password: Type.string({ required: true }),
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    uppercase: true,
    required: false,
    trim: true,
    default: "",
    maxlength: 50
  },
  lastName: {
    type: String,
    uppercase: true,
    required: false,
    trim: true,
    default: "",
    maxlength: 50
  },
  origen: { type: String, require: false, trim: true, default: "Register" },
  role: Type.objectId({ required: false, default: null }),
  birthday: Type.date({ required: false, default: new Date("2000/01/01") }),
  creationDate: Type.date({ required: true }),
  updateDate: Type.date({ required: true })
});

const userImportData = (data: IUser): Partial<IUser> => {
  let user: Partial<IUser> = {};
  if (data.username) user.username = data.username;
  if (data.password) user.password = data.password;
  if (data.email) user.email = data.email;
  if (data.name) user.name = data.name;
  if (data.lastName) user.lastName = data.lastName;
  if (data.origen) user.origen = data.origen;
  if (data.role) user.role = data.role;
  if (data.birthday)
    user.birthday = new Date(getFullDateFromStr(data.birthday.toString()));
  if (data.creationDate) user.creationDate = data.creationDate;
  if (data.updateDate) user.updateDate = data.updateDate;
  return user;
};
type UserDoc = ExtractDoc<typeof USER_SCHEMA>;

export default typedModel("User", USER_SCHEMA);
export { IUser, IPayload, UserDoc, userImportData };
