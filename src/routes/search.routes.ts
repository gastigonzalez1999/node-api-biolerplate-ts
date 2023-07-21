import { Router } from 'express';
import SearchController from '../controllers/search.controller';

const searchRouter: Router = Router();
const searchController: SearchController = new SearchController();

searchRouter.get('/:collection/:term', searchController.search)

export default searchRouter;