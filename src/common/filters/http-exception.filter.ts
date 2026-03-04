import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global HTTP exception filter. Catches any exception thrown in the app
 * and returns a consistent JSON shape: { statusCode, message, error? }.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    const body =
      typeof message === 'object' && message !== null && 'message' in message
        ? (message as { message: string | string[] })
        : { message };

    this.logger.warn(
      `${req.method} ${req.url} ${status} - ${JSON.stringify(body)}`,
    );

    res.status(status).json({
      statusCode: status,
      ...body,
    });
  }
}
