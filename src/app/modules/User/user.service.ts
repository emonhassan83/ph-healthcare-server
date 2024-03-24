import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
