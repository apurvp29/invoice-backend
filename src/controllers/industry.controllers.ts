import { prisma } from "../prismaClient";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { SuccessResponse, InternalServerError } from "../config/constant";

export const createClientIndustry = async (req: Request, res: Response) => {
  const { industryName } = req.body;

  try {
    const industry = await prisma.clientIndustry.create({
      data: {
        industryName,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Industry added.", StatusCodes.CREATED, industry));
  } catch (error: any | unknown) {
    console.error({ error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getClientIndustries = async (req: Request, res: Response) => {
  try {
    const indusries = await prisma.clientIndustry.findMany();
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("successful", StatusCodes.OK, indusries));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
