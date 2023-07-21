import { Router } from 'express';
import { check } from 'express-validator';

import ProductsController from '../controllers/products.controller';
import { validateJwt } from '../middlewares/validate-jwt';
import { validateFields } from '../helpers/validate-fields';
import { isAdminRole } from '../helpers/validate-roles';
import { categoryExists, productExists } from '../helpers/db-validators';

const productsRouter: Router = Router();
const productsController: ProductsController = new ProductsController();

productsRouter.get('/', [
  validateFields
] , productsController.getProducts);

productsRouter.get('/:id', [
  check('id', 'Is not a valid mongoID').isMongoId(),
  check('id').custom(productExists),
  validateFields
] , productsController.getProduct);

productsRouter.post('/', [
  validateJwt,
  check('name', 'name is required').not().isEmpty(),
  check('category', 'category is required and must be a mongoID').isMongoId(),
  check('category').custom(categoryExists),
  validateFields
] , productsController.createProduct);

productsRouter.put('/:id', [
  validateJwt,
  check('id').custom(productExists),
  check('name', 'name is required').not().isEmpty(),
  validateFields
] , productsController.updateProduct);

productsRouter.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'Is not a valid mongoID').isMongoId(),
  check('id').custom(productExists),
  validateFields
] , productsController.deleteProduct);

export default productsRouter;