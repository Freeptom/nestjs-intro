import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';

@Injectable()
export class DataResponseInterceptor<T = any>
  implements NestInterceptor<unknown, { apiVersion: string; data: T }>
{
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ apiVersion: string; data: T }> {
    const apiVersion = this.configService.get<string>('appConfig.apiVersion');

    if (!apiVersion) {
      throw new Error('Missing appConfig.apiVersion in configuration');
    }
    return next.handle().pipe(
      map((data: T) => ({
        apiVersion,
        data,
      })),
    );
  }
}
