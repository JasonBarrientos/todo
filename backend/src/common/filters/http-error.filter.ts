import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

      response.status(status).json({
      success: false,
      statusCode: status,
      message: (exceptionResponse as any).message || exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
