import { NextFunction, Request, Response } from "express";

import { UserLogin, googleSignIn } from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";

export default class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userLoginBody: UserLogin = req.body;
      const loginAttempt = await this.authService.login(userLoginBody);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const googleSignInBody: googleSignIn = req.body;
      const googleLogInAttempt = await this.authService.googleSignIn(googleSignInBody);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
