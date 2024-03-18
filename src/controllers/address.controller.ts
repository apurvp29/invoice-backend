import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const createAddress = async (req: Request, res: Response) => {
  const { addressLineOne, cityName, countryName, stateName, pincode } =
    req.body;

  try {
    const address = await prisma.address.create({
      data: {
        addressLineOne,
        cityName,
        stateName,
        countryName,
        pincode,
      },
    });
    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Address created", StatusCodes.CREATED, address));
  } catch (error: unknown | any) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const addressId = req.params.addressId;
  const bodyValue = req.body;

  try {
    const address = await prisma.address.update({
      where: {
        addressId,
      },
      data: bodyValue,
    });
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Address updated", StatusCodes.OK, address));
  } catch (error: unknown | any) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
