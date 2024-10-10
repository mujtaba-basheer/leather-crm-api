import * as Joi from 'joi';

interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  DB_HOSTNAME: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  RANDOM_VARIABLE: string;
}

export const configSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string().valid('developemnt', 'staging', 'production', 'test'),
  PORT: Joi.number().port().default(8080),
  DB_HOSTNAME: Joi.string().hostname().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  RANDOM_VARIABLE: Joi.string(),
});
