import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const getCities = async (req: Request, res: Response) => {
  const selectedStateId = req.params.id;
  try {
    const cities = await prisma.city.findMany({
      where: {
        stateId: Number(selectedStateId),
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(
        SuccessResponse("successful fetched Cities", StatusCodes.OK, cities)
      );
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
