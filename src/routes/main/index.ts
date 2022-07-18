import express from 'express';
import { mainController } from '../../controllers/main/main.controller';
import { preSearchController } from '../../controllers/main/preSearch.controller';

const router = express.Router();

router.get('/', mainController);
router.get('/pre-search', preSearchController);

export default router;
