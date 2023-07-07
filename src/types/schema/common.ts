export type ICode = 200 | 401 | 404;

export interface I_Response_Type<T> {
  httpStatusCode: ICode;
  timestamp: string;
  description: string;
  response: {
    code?: ICode;
    description?: string;
    data: T;
  };
  data: T;
}

export interface I_Meta {
  httpStatusCode: ICode;
  requestId: string;
  attempts: number;
  totalRetryDelay: number;
  extendedRequestId: string;
  cfId: string;
}
