import { NextFunction, Request, Response } from "express";

import UserService from "../services/user.service";
import { CreateUser, UpdateUser, UserQuery } from '../interfaces/user.interface';

export default class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData: UserQuery = req.query;
      const users = await this.userService.getUsers(queryData);

      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);

      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createUserBody: CreateUser = req.body;
      const createUser = await this.userService.createUser(createUserBody);

      res.status(201).send(createUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUserBody: UpdateUser = req.body;
      const updateUser = await this.userService.updateUser(updateUserBody);

      res.status(201).send(updateUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteUser = await this.userService.deleteUser(id);

      res.status(204).send(deleteUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
