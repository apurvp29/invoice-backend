import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const getStates = async (req: Request, res: Response) => {
  const selectedCountry = req.params.id;
  try {
    const states = await prisma.state.findMany({
      where: {
        countryId: Number(selectedCountry),
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(
        SuccessResponse("successful fetched States", StatusCodes.OK, states)
      );
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
