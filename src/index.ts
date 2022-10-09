import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./routes/users.routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
