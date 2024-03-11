import { StatusCodes } from "http-status-codes";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";
import {
  BadRequest_Error,
  InternalServerError,
  SuccessResponse,
} from "../config/constant";

export const createBanking = async (req: Request, res: Response) => {
  let ifscRegex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);
  let swiftRegex = new RegExp(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/);
  if (!ifscRegex.test(req.body.ifsc)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid IFSC code!"));
  }
  if (!swiftRegex.test(req.body.swiftCode)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid Swift code!"));
  }

  try {
    const bankDetails = await prisma.bankingDetails.create({
      data: req.body,
    });
    return res
      .status(StatusCodes.CREATED)
      .send(
        SuccessResponse(
          "Banking Details Added",
          StatusCodes.CREATED,
          bankDetails
        )
      );
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
