import { AppError } from "./ApiError";

export class BadRequestException extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, 400);
  }
}
