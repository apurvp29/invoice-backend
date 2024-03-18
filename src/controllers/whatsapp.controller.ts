import { Request, Response } from "express";
import { Twilio } from "twilio";
import { InternalServerError, SuccessResponse } from "../config/constant";
import { StatusCodes } from "http-status-codes";
import { uploadFile } from "./upload.controller";
import { settings } from "../config/settings";

const accountSid = settings.twilioCredentials.accountSid;
const authToken = settings.twilioCredentials.authToken;
const client = new Twilio(accountSid, authToken);

export const sendMessage = async (req: Request, res: Response) => {
  const { invoiceNumber } = req.body;
  const fileLocation = `pdf/invoice_${invoiceNumber}.pdf`;
  const locationURL = await uploadFile(fileLocation, "bucket-invoice-pdf");
  const download = req.query["isDownload"];
  if (download === "true") {
    return res
      .status(StatusCodes.OK)
      .send(
        SuccessResponse("Uploaded Successfully", StatusCodes.OK, locationURL)
      );
  } else {
    client.messages
      .create({
        body: "Hello From typescript",
        mediaUrl: [locationURL],
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919998757892",
      })
      .then((message) => {
        return res
          .status(StatusCodes.OK)
          .send(SuccessResponse("Message Sent", StatusCodes.OK, message));
      })
      .catch((error: unknown | any) => {
        console.error(error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(InternalServerError());
      });
  }
};
