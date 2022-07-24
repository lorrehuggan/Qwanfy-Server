export class ApiError {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
  static badRequest(message: string) {
    return new ApiError(400, message);
  }
  static internalServerError(message: string) {
    return new ApiError(500, message);
  }
}
