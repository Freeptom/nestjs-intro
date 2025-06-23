import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * Builds the app
 **/
async function bootstrap() {
  try {
    console.log('start bootstrap');
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    /**
     * Swagger config
     **/
    const config = new DocumentBuilder()
      .setTitle('NestJs Masterclass - Blog app API')
      .setDescription('Use the base API URL as http://localhost:3000')
      .addServer('http://localhost:3000')
      .setVersion('1.0')
      .build();

    // Instantiate document
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    // enable cors
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
  } catch (err) {
    console.log('error', err);
  }
}

bootstrap();
