import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    const admin = req.body;
    
    const result = await userService.createAdmin(admin);
    res.send(result);
}

export const userController = {
    createAdmin
};