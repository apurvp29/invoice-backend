import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const createTax = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;

  const { taxName, taxPercentage } = req.body;

  try {
    const invoiceTax = await prisma.invoiceTax.create({
      data: {
        invoiceId,
        taxName,
        taxPercentage: Number(taxPercentage),
      },
    });
    return res
      .status(StatusCodes.CREATED)
      .send(
        SuccessResponse("Invoice tax created", StatusCodes.CREATED, invoiceTax)
      );
  } catch (error: unknown | any) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
