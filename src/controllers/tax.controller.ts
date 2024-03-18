import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  BadRequest_Error,
  InternalServerError,
  NotFound_Error,
  SuccessResponse,
} from "../config/constant";
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

export const updateTax = async (req: Request, res: Response) => {
  const invoiceTaxId = req.params.invoiceTaxId;
  const bodyValue = req.body;

  if (bodyValue.invoiceTaxId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Can not change invoice tax id!"));
  }
  try {
    const updatedTax = await prisma.invoiceTax.update({
      where: {
        invoiceTaxId,
      },
      data: bodyValue,
    });
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Tax updated", StatusCodes.OK, updatedTax));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const deleteTax = async (req: Request, res: Response) => {
  const invoiceTaxId = req.params.invoiceTaxId;

  const findTax = await prisma.invoiceTax.findUnique({
    where: {
      invoiceTaxId,
    },
  });

  if (!findTax) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(NotFound_Error("Tax not exist!"));
  }

  try {
    const deleteItem = await prisma.invoiceTax.delete({
      where: {
        invoiceTaxId,
      },
    });

    res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Tax Deleted", StatusCodes.OK, null));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
