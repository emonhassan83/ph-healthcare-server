import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const admin = req.body;
    
    const result = await userService.createAdmin(admin);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully!",
        data: result
    });
   } catch (err) {
    next(err)
}
}

export const userController = {
    createAdmin
};