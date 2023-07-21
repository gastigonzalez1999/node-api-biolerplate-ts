import { NextFunction, Request, Response } from "express";

import CategoriesService from "../services/categories.service";
import { CategoriesQuery, CreateCategory, UpdateCategory } from "../interfaces/categories.interface";

export default class CategoriesController {
  categoriesService: CategoriesService;
  constructor() {
    this.categoriesService = new CategoriesService();
  }

  public getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData: CategoriesQuery = req.query;
      const categories = await this.categoriesService.getCategories(queryData);

      res.status(200).send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const categoryById = await this.categoriesService.getCategory(id);

      res.status(200).send(categoryById);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createCategoryBody: CreateCategory = req.body;
      const createCategory = await this.categoriesService.createCategory(createCategoryBody);

      res.status(201).send(createCategory);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateCategoryBody: UpdateCategory = req.body;
      const updateCategory = await this.categoriesService.updateCategory(updateCategoryBody);

      res.status(201).send(updateCategory);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteCategory = await this.categoriesService.deleteCategory(id);

      res.status(204).send(deleteCategory);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
