import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * The main application controller.
 * Handles root-level routes and delegates logic to the AppService.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
