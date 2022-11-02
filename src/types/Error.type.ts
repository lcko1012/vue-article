export interface IErrorResponse {
  data: {
    statusCode: number;
    message: string[];
    error: string;
  };
}
