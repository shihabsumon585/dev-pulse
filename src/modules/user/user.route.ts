import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
export const userRoute = router;


router.post("/signup", userController.createUser);
router.get("/login", userController.userLogin);