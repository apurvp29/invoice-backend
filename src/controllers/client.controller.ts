import { prisma } from "../prismaClient";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  BadRequest_Error,
  SuccessResponse,
  InternalServerError,
  NotFound_Error,
} from "../config/constant";

export const createClient = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  const gstRegex = new RegExp(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  );

  if (!panRegex.test(bodyValue.pan)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid PAN number!"));
  }
  if (!gstRegex.test(bodyValue.gst)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid GST number!"));
  }

  try {
    const business = await prisma.client.create({
      data: bodyValue,
    });

    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Client created", StatusCodes.CREATED, business));
  } catch (error: any | unknown) {
    console.error({ error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  if (req.body.email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Can't change Email!"));
  }

  const bodyValue = req.body;
  const panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  const gstRegex = new RegExp(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  );

  if (bodyValue.pan && !panRegex.test(bodyValue.pan)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid PAN number!"));
  }
  if (bodyValue.gst && !gstRegex.test(bodyValue.gst)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid GST number!"));
  }

  try {
    const updatedObj = { ...req.body };
    const updatedClient = await prisma.client.update({
      where: {
        clientId,
      },
      data: {
        ...updatedObj,
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Client updated", StatusCodes.OK, updatedClient));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  const findClient = await prisma.client.findUnique({
    where: {
      clientId,
    },
  });

  if (!findClient) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(NotFound_Error("Client not exist!"));
  }

  try {
    const deleteClient = await prisma.client.delete({
      where: {
        clientId,
      },
    });

    res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Deleted Client", StatusCodes.OK, null));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("successful", StatusCodes.OK, clients));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getClient = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  try {
    const client = await prisma.client.findUnique({
      where: {
        clientId,
      },
    });
    if (!client) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Business not exist!"));
    }
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("found", StatusCodes.OK, client));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
