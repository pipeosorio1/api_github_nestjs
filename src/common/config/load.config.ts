import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().required(),
  URL_GITHUB: Joi.string().required(),
  GITHUB_ACCESS_TOKEN: Joi.string().empty(),
});

export const LoadConfig = ConfigModule.forRoot({
  validationSchema: validationSchema,
  expandVariables: true,
});
