// Nestjs va tashqi kutubxonalar
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/config.service';
import { SwaggerModule } from '@nestjs/swagger';
import log from 'consola';

// Loyihaning xususiy modullari va local fayllar
import { swaggerConfig } from '@config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // AppConfigService'ni olish
  const appConfigService = app.get(AppConfigService);

  // Global api prefix qo'shish
  const api = 'api/v1';
  app.setGlobalPrefix(api);

  // Class validator
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(api, app, documentFactory);

  // PORT'ni AppConfigService'dan olish
  const PORT = appConfigService.port;

  // Serverni ishga tushirish
  await app.listen(PORT, () => {
    log.box(
      `Server ${PORT}da ishladi\n\nSwagger => http://localhost:${PORT}/${api}`,
    );
  });
}
bootstrap();
