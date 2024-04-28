import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

class ResponseFormat<T> {
  @ApiProperty()
  total: number;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      catchError((error) => {
        const status = 500;
        const response: any = {
          message: 'Internal server error',
        };

        // if (error) {
        //   status = error.status || 500;
        //   response.message = error.message || 'unknown_error';

        //   if (error.description) {
        //     response.description = error.description;
        //   }
        // }
        response.method = request.method;
        response.statusCode = status;
        response.success = false;

        return throwError(() => new HttpException(response, status, { cause: error }));
      }),
      map(({ data, total }) => ({
        data,
        total,
        isArray: Array.isArray(data),
        success: true,
      })),
    );
  }
}
