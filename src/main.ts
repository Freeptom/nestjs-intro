import { AppModule } from './app.module';
import { appCreate } from './app.create';
import { NestFactory } from '@nestjs/core';
/**
 * Builds the app
 **/
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // Add middleware
    appCreate(app);
    await app.listen(process.env.PORT ?? 3000);
  } catch (err) {
    console.log('error', err);
  }
}

bootstrap();
