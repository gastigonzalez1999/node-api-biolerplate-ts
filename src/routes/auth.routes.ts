import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../helpers/validate-fields';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = Router();
const authController: AuthController = new AuthController();

authRouter.post('/login', [
  check('email', 'email is required and must be in correct format').isEmail(),
  check('password', 'password is required and must not be empty').not().isEmpty(),
  validateFields
], authController.login);

authRouter.post('/google', [
  check('id_token', 'google token is required').not().isEmpty(),
  validateFields
] , authController.googleSignIn);

export default authRouter;
