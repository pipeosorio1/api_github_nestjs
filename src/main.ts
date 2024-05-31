import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { swaggerConfig } from '@common/config/swagger.config';
import { Keys } from '@common/enums/keys.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get<number>(Keys.APP_PORT);
  const name = configService.get<string>(Keys.APP_NAME);

  const config = swaggerConfig(name);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });

  await app.listen(port);
}
bootstrap();
