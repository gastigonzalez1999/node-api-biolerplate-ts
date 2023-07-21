import { NextFunction, Request, Response } from "express";

import ProductsService from "../services/products.service";
import { ProductsQuery, CreateProduct, UpdateProduct } from '../interfaces/products.interface';

export default class ProductsController {
  productsService: ProductsService;
  constructor() {
    this.productsService = new ProductsService();
  }

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData: ProductsQuery = req.query;
      const products = await this.productsService.getProducts(queryData);

      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productsService.getProduct(id);

      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductBody: CreateProduct = req.body;
      const createProduct = await this.productsService.createProduct(createProductBody);

      res.status(201).send(createProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateProductBody: UpdateProduct = req.body;
      const updateProduct = await this.productsService.updateProduct(updateProductBody);

      res.status(201).send(updateProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteProduct = await this.productsService.deleteProduct(id);

      res.status(204).send(deleteProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}