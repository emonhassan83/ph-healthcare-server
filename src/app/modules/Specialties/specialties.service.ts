import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { Specialties } from "@prisma/client";

const insertIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

const deleteFromDB = async (id: string): Promise<Specialties> => {
  await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });
  
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SpecialtiesService = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};
