import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

import User from "../entities/user.entity";
import SearchService from "../services/search.service";
import Category from "../entities/category.entity";
import Product from "../entities/product..entity";

export default class SearchController {
  searchService: SearchService;
  constructor() {
    this.searchService = new SearchService();
  }

  public allowedCollections = [
    'users',
    'category',
    'products',
    'roles',
  ];

  public searchUsers = async (term: string, res: Response, next: NextFunction) => {
    try {
      const isMongoId = ObjectId.isValid(term);

      if (isMongoId) {
        const user = await User.findById(term);
        res.json({
          results: (user) ? [user] : []
        });
      }

      const searchUsers = await this.searchService.searchUsers(term);
      return searchUsers;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public searchCategories = async (term: string, res: Response, next: NextFunction) => {
    try {
      const isMongoId = ObjectId.isValid(term);

      if (isMongoId) {
        const category = await Category.findById(term);
        res.json({
          results: (category) ? [category] : []
        });
      }
  
      const searchCategories = await this.searchService.searchCategories(term);
      return searchCategories;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public searchProducts = async (term: string, res: Response, next: NextFunction) => {
    try {
      const isMongoId = ObjectId.isValid(term);

      if (isMongoId) {
        const product = await Product.findById(term).populate('category', 'term');
        res.json({
          results: (product) ? [product] : []
        });
      }

      const searchProducts = await this.searchService.searchProducts(term);
      return searchProducts;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { collection, term } = req.params;

      if (!this.allowedCollections.includes(collection)) {
        return res.status(400).json({
          msg: `The allowed collections are ${this.allowedCollections}`
        });
      }

      const search = await this.searchService.search(collection, term);
      return search;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}