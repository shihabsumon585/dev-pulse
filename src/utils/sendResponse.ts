import type { Response } from "express";

interface IResponse {
    status: number;
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

const sendResponse = (res: Response, data: IResponse) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error
    })
}

export default sendResponse;