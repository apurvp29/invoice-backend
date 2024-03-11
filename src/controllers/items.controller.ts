import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  BadRequest_Error,
  InternalServerError,
  NotFound_Error,
  SuccessResponse,
} from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const createItem = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const { itemName, quantity, rate } = req.body;

  try {
    const item = await prisma.invoiceItems.create({
      data: {
        invoiceId,
        itemName,
        quantity: Number(quantity),
        rate: Number(rate),
      },
    });
    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Item created", StatusCodes.CREATED, item));
  } catch (error: unknown | any) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const invoiceItemsId = req.params.invoiceItemsId;
  const bodyValue = req.body;

  if (bodyValue.invoiceId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Can not change invoice id!"));
  }
  try {
    const updatedInvoice = await prisma.invoiceItems.update({
      where: {
        invoiceItemsId,
      },
      data: {
        ...bodyValue,
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Item updated", StatusCodes.OK, updatedInvoice));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const invoiceItemsId = req.params.invoiceItemsId;

  const findItem = await prisma.invoiceItems.findUnique({
    where: {
      invoiceItemsId,
    },
  });

  if (!findItem) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(NotFound_Error("Invoice not exist!"));
  }

  try {
    const deleteItem = await prisma.invoiceItems.delete({
      where: {
        invoiceItemsId,
      },
    });

    res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Item Deleted", StatusCodes.OK, null));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.invoiceItems.findMany();
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("successful", StatusCodes.OK, items));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getItem = async (req: Request, res: Response) => {
  const invoiceItemsId = req.params.invoiceItemsId;

  try {
    const item = await prisma.invoiceItems.findUnique({
      where: {
        invoiceItemsId,
      },
    });
    if (!item) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Business not exist!"));
    }
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("found", StatusCodes.OK, item));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
