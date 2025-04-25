import { Injectable } from '@nestjs/common';

/**
 * Application service that contains core business logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a simple 'Hello World!' message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
