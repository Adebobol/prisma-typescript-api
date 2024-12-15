import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { signUpSchema } from "./schema/user";

const app: Express = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Prisma $ Typescript...");
});

app.use("/api", rootRouter);
app.use(errorMiddleware);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = signUpSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

app.listen(PORT, () => console.log(`App is working on port ${PORT}...`));
