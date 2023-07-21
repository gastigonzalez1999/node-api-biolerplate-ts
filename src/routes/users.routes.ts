import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../helpers/validate-fields';
import { hasRole, isAdminRole } from '../helpers/validate-roles';
import { validateJwt } from '../middlewares/validate-jwt';
import UserController from '../controllers/user.controller';
import { emailExist, isValidRole, userIdExist } from '../helpers/db-validators';

const usersRouter: Router = Router();
const userController = new UserController();

usersRouter.get('/', userController.getUsers);

usersRouter.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isValidRole),
    validateFields
] , userController.updateUser);

usersRouter.get('/:id', [
    check('id', 'Is  not valid MongoId').isMongoId(),
    check('id').custom(userIdExist),
    validateFields
  ], userController.getUser);

usersRouter.post('/', 
[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'The password is required and must be longer than 6 letters').isLength({ min: 6 }),
    check('role', 'The role is not valid').isIn(['ADMIN', 'USER']),
    check('role').custom(isValidRole),
    validateFields
], userController.createUser);

usersRouter.delete('/:id', [
    validateJwt,
    isAdminRole,
    hasRole('ADMIN'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    validateFields
] , userController.deleteUser);

export default usersRouter;
