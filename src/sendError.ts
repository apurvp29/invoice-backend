export type Error = {
  error: string;
  code: number;
};

export const sendError = (error: string, code: number) => {
  const response: Error = {
    error: error,
    code: code,
  };
  return response;
};
