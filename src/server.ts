import express, { type Request, type Response } from "express";
import config from "./config.ts";
const app = express()
const port = config.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})