import app from "./core/app";
import { PORT } from "./config/initializer";

app.listen(PORT, () => console.log(`Server running on: ${PORT}!`));
