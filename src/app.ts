import express, { application, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { insuranceRouter } from "./routes/InsuranceRouter";
import { userRouter } from "./routes/UserRouter";
import { simulatorRouter } from "./routes/SimulatorRouter";
const App = express();

App.use(express.json());

App.use("/users", userRouter);
App.use("/insurances", insuranceRouter);
App.use("/simulator", simulatorRouter);

App.get("/", (request: Request, response: Response) => {
  response.json({ message: "Seuguru" });
});

App.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).send(err.message);
    }

    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
);

export { App };
