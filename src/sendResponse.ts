import { ResponseModel } from "./ResponseModel";

export const sendResponse = (
  msg: string,
  code: number,
  data: Record<string, any> | Record<string, any[]>
) => {
  const response: ResponseModel = {
    message: msg,
    code: code,
    data: data,
  };
  return response;
};
