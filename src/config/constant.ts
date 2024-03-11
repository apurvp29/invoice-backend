import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const BadRequest_Error = (message: string) => {
  return {
    error: message,
    code: StatusCodes.BAD_REQUEST,
  };
};

export const Unauthorized_Error = (message: string) => {
  return {
    error: message,
    code: StatusCodes.UNAUTHORIZED,
  };
};

export const NotFound_Error = (message: string) => {
  return {
    error: message,
    code: StatusCodes.NOT_FOUND,
  };
};

export const SuccessResponse = (
  message: string,
  code: StatusCodes,
  data: any
) => {
  return {
    message: message,
    code: code,
    data: data,
  };
};

export const InternalServerError = () => {
  return {
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
  };
};
