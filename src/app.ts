import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is the root of the server!",
        data: {}
    })
})


app.use("/api/users", userRoute);




export default app;