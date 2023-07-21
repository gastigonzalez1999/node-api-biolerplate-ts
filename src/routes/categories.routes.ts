import { Router } from 'express';
import { check } from 'express-validator';

import CategoriesController from '../controllers/categories.controller';
import { validateFields } from '../helpers/validate-fields';
import { categoryExists } from '../helpers/db-validators';
import { validateJwt } from '../middlewares/validate-jwt';
import { isAdminRole } from '../helpers/validate-roles';

const categoriesRouter: Router = Router();
const categoriesController: CategoriesController = new CategoriesController();

categoriesRouter.get('/', [
  validateFields,
], categoriesController.getCategories);

categoriesRouter.get('/:id', [
  check('id', 'Is  not valid MongoId').isMongoId(),
  check('id').custom(categoryExists),
  validateFields
], categoriesController.getCategory);

categoriesRouter.post('/', [
  validateJwt,
  check('name', 'name is required').not().isEmpty(),
  validateFields
] , categoriesController.createCategory);

categoriesRouter.put('/:id', [
  validateJwt,
  check('id').custom(categoryExists),
  check('name', 'name is required').not().isEmpty(),
  validateFields
] , categoriesController.updateCategory);

categoriesRouter.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'Is not a valid mongoID').isMongoId(),
  check('id').custom(categoryExists),
  check('name', 'name is required').isEmail(),
  validateFields
] , categoriesController.deleteCategory);

export default categoriesRouter;
