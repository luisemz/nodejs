import mongoose from "mongoose";
import app from "./core/app";
import { PORT, DB_HOST, DB_PORT, DB_NAME } from "./config/initializer";

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log(`Database conneted: ${DB_NAME}`);
  })
  .catch(err => {
    console.error(err.stack);
  });

app.listen(PORT, () => console.log(`Server running on: ${PORT}!`));
