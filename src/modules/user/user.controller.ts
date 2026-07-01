import type { Request, Response } from "express"
import { userService } from "./user.service"
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import jwt from "jsonwebtoken";




const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body);

        // res.status(200).json({
        //     success: true,
        //     message: "User registered successfully",
        //     data: result.rows[0]
        // })
        delete result.rows[0].password;
        sendResponse(res, {
            status: 200,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        // res.status(500).json({
        //     message: error.message,
        //     error: error
        // })
        sendResponse(res, {
            status: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const result = await userService.userLoginResponceIntoDB(req.body);

        const payload = {
            id: result.id,
            name: result.name,
            role: result.role
        }

        const token = await jwt.sign(payload, config.secret_key as string, { expiresIn: "1d" });

        res.cookie("accessToken", token);


        sendResponse(res, {
            status: 200,
            success: true,
            message: "Login successful",
            data: { token, user: result }
        })
    } catch (error: any) {
        sendResponse(res, {
            status: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const userController = {
    createUser,
    userLogin
}