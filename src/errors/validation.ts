import { AppError } from "./ApiError";

export class UnprocessableEntity extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
