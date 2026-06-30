import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is the root of the server!",
        data: {}
    })
})


app.use("/api/auth", userRoute);




export default app;