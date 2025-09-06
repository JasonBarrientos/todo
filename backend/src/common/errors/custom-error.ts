import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponseDto } from '../dtos/error-response.dto';

export class CustomError extends HttpException {
  constructor(
    message: string | string[],
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    path?: string, // opcional si querés incluir la URL
  ) {
    const errorResponse: ErrorResponseDto = {
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? 'Validation failed' : message,
      path: path || '',
      timestamp: new Date().toISOString(),
      errors: Array.isArray(message) ? message : undefined,
    };
    super(errorResponse, status);
  }
}
