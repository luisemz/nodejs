import { createSchema, typedModel, Type, ExtractDoc } from "ts-mongoose";
import { Types } from "mongoose";

interface ISession {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  creationDate: Date;
}

const SESSION_SCHEMA = createSchema({
  user: Type.objectId({ required: true, unique: true, ref: "User" }),
  creationDate: Type.date({ required: true })
});

type SessionDoc = ExtractDoc<typeof SESSION_SCHEMA>;

export default typedModel("Session", SESSION_SCHEMA);
export { ISession, SessionDoc };
