import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  BadRequest_Error,
  InternalServerError,
  NotFound_Error,
  SuccessResponse,
} from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const createBusiness = async (req: Request, res: Response) => {
  const { name, email, phone, logo, nickname, pan, tan, gst } = req.body;
  const panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  const gstRegex = new RegExp(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  );

  if (!panRegex.test(pan)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid PAN number!"));
  }
  if (!gstRegex.test(gst)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid GST number!"));
  }

  try {
    const business = await prisma.business.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        logo: logo,
        nickName: nickname,
        pan: pan,
        gst: gst,
        tan: tan,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Business created", StatusCodes.CREATED, business));
  } catch (error: any | unknown) {
    console.error({ error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.businessId;
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
    const updatedBusiness = await prisma.business.update({
      where: {
        businessId,
      },
      data: {
        ...updatedObj,
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(
        SuccessResponse("Business created", StatusCodes.OK, updatedBusiness)
      );
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.businessId;

  const findBusiness = await prisma.business.findUnique({
    where: {
      businessId,
    },
  });

  if (!findBusiness) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(NotFound_Error("Business not exist!"));
  }

  try {
    const deleteBusiness = await prisma.business.delete({
      where: {
        businessId,
      },
    });

    res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Deleted Business", StatusCodes.OK, null));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getAllBusiness = async (req: Request, res: Response) => {
  try {
    const businesses = await prisma.business.findMany();
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("successful", StatusCodes.OK, businesses));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.businessId;

  try {
    const business = await prisma.business.findUnique({
      where: {
        businessId,
      },
    });
    if (!business) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Business not exist!"));
    }
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("found", StatusCodes.OK, business));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
