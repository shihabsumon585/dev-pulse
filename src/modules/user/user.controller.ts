import type { Request, Response } from "express"
import { userService } from "./user.service"




const createUser = async(req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB();
    } catch (error) {
        
    }
}


export const userController = {
    createUser
}