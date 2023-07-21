import { Router } from 'express';
import { check } from 'express-validator';

import UploadsController from '../controllers/uploads.controller';
import { validateFields } from '../helpers/validate-fields';
import { allowedCollections } from '../helpers/db-validators';
import { validateFile } from '../middlewares/validate-file';

const uploadsRouter: Router = Router();
const uploadsController: UploadsController = new UploadsController();

uploadsRouter.post('/', [
  validateFile,
  validateFields,
] , uploadsController.loadFile);

uploadsRouter.put('/collection/:id', [
  validateFile,
  check('id', 'The Id must be a mongoId').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
], uploadsController.updateFileCloudinary);

uploadsRouter.get('/:collection/:id', [
  check('id', 'The Id must be a mongoId').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
] , uploadsController.showImage);

export default uploadsRouter;
