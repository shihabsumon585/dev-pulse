import type { Request, Response } from "express"
import { userService } from "./user.service"




const createUser = async(req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: "User registration successfull...",
            data: result.rows[0]
        })
    } catch (error: any) {        
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const result = await userService.userLoginResponceIntoDB(req.body);
    } catch (error) {
        
    }
}


export const userController = {
    createUser,
    userLogin
}