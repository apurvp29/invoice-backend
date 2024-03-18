import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await prisma.country.findMany();
    return res
      .status(StatusCodes.OK)
      .send(
        SuccessResponse(
          "successful fetched countries",
          StatusCodes.OK,
          countries
        )
      );
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
