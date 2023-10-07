import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;

  @ApiProperty()
  path: string;

  @ApiProperty()
  duration: string;

  data: T;
}

@Injectable()
export class WrapResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        status: response.statusCode,
        isArray: Array.isArray(data),
        duration: `${Date.now() - now}ms`,
        path: request.path,
        data,
      })),
    );
  }
}
