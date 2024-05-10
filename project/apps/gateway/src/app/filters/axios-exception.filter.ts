import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  public catch(error: AxiosError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.statusText || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
