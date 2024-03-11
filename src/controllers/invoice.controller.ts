import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  BadRequest_Error,
  InternalServerError,
  NotFound_Error,
  SuccessResponse,
} from "../config/constant";
import { StatusCodes } from "http-status-codes";

export const createInvoice = async (req: Request, res: Response) => {
  const { invoiceNumber, invoiceDate, dueDate, billedTo, billedBy, discount } =
    req.body;

  if (dueDate && new Date(dueDate) < new Date()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Invalid due date!"));
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        billedBy,
        invoiceDate: new Date(invoiceDate),
        billedTo,
        dueDate: new Date(dueDate),
        discount,
      },
    });
    return res
      .status(StatusCodes.CREATED)
      .send(SuccessResponse("Invoice created", StatusCodes.CREATED, invoice));
  } catch (error: unknown | any) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const bodyValue = req.body;

  if (bodyValue.invoiceNumber) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(BadRequest_Error("Can not update invoice number!"));
  }
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: {
        invoiceId,
      },
      data: {
        ...bodyValue,
      },
    });
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Invoice updated", StatusCodes.OK, updatedInvoice));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;

  const findInvoice = await prisma.invoice.findUnique({
    where: {
      invoiceId,
    },
  });

  if (!findInvoice) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(NotFound_Error("Invoice not exist!"));
  }

  try {
    const deleteInvoice = await prisma.invoice.delete({
      where: {
        invoiceId,
      },
    });

    res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Deleted Invoice", StatusCodes.OK, null));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany();
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("successful", StatusCodes.OK, invoices));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getInvoiceId = async (req: Request, res: Response) => {
  const invoiceNumber = req.params.invoiceNumber;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceNumber: invoiceNumber,
      },
      select: {
        invoiceId: true,
      },
    });
    if (!invoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Invoice not exist!"));
    }
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("found", StatusCodes.OK, invoice));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceId,
      },
    });
    if (!invoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Invoice not exist!"));
    }
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("found", StatusCodes.OK, invoice));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};

export const getInvoiceDetail = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceId,
      },
      select: {
        invoiceNumber: true,
        invoiceDate: true,
        dueDate: true,
        billedBy: true,
        billedTo: true,
      },
    });
    if (!invoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Invoice not exist!"));
    }

    const business = await prisma.business.findUnique({
      where: {
        businessId: invoice.billedBy,
      },
      select: {
        name: true,
        email: true,
        gst: true,
        pan: true
      },
    });
    if (!business) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Business not exist!"));
    }

    const client = await prisma.client.findUnique({
      where: {
        clientId: invoice.billedTo,
      },
      select: {
        name: true,
        industryName: true,
        pan: true,
        gst: true,
        email: true,
      },
    });
    if (!client) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(NotFound_Error("Client not exist!"));
    }

    const items = await prisma.invoiceItems.findMany({
      where: {
        invoiceId,
      },
      select: {
        invoiceItemsId: true,
        itemName: true,
        quantity: true,
        rate: true,
      },
    });

    const taxes = await prisma.invoiceTax.findMany({
      where: {
        invoiceId,
      },
      select: {
        invoiceTaxId: true,
        taxName: true,
        taxPercentage: true
      },
    });

    let subTotal: number = 0;
    items.forEach((item) => {
      subTotal += item.quantity * item.rate;
    });

    let total: number = subTotal;
    taxes.forEach(tax => {
      total += ((subTotal / 100) * tax.taxPercentage);
    })

    const finalData = {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      invoiceDueDate: invoice.dueDate,
      businessName: business.name,
      businessEmail: business.email,
      businessGST: business.gst,
      businessPan: business.pan,
      clientGST: client.gst,
      clientPAN: client.pan,
      clientName: client.name,
      clientIndustryName: client.industryName,
      clientEmail: client.email,
      itemsInvoice: items,
      taxInvoice: taxes,
      totalAmount: total.toFixed(2),
    };
    return res
      .status(StatusCodes.OK)
      .send(SuccessResponse("Data fetched", StatusCodes.OK, finalData));
  } catch (error: unknown | any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(InternalServerError());
  }
};
