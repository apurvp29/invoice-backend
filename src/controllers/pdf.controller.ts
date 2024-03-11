import { Request, Response } from "express";
import { generatePdf } from "../utils/generate-pdf";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../config/constant";

export const createPdf = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const pdf = await generatePdf(bodyValue);
  res.contentType("application/pdf");
  return res
        .status(StatusCodes.OK)
        .send(SuccessResponse("Data fetched", StatusCodes.OK, pdf));
};
