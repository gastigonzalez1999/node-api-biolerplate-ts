import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const schema = Joi.object({
  APP: Joi.string().valid('development', 'production').required(),
  PORT: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  PASSWORD: Joi.string().required(),
  USER: Joi.string().required(),
  SECRETORPRIVATEKEY: Joi.string().required(),

  GOOGLE_CLIENT: Joi.string().required(),
  GOOGLE_SECRET: Joi.string().required(),

  CLOUDINARY_URL: Joi.string().required(),
});

const config = {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '8000',

  DB_HOST: process.env.DB_HOST,
  PASSWORD: process.env.DB_PASSWORD || 'db-password',
  USER: process.env.USER || 'user',
  SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY,

  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,

  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

const { error, value } = schema.validate(config, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (error) {
  console.log(
    `Validation error: ${error.details.map((err) => err.message).join('\n')}`,
  );
  process.exit();
}

export default value;

