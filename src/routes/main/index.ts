import express from 'express';
import { artistController } from '../../controllers/main/artist';
import { login } from '../../controllers/main/login.controller';
import { mainController } from '../../controllers/main/main.controller';
import { preSearchController } from '../../controllers/main/preSearch.controller';
import { testController } from '../../controllers/main/test';
import { user } from '../../controllers/main/user.controller';

const router = express.Router();

router.post('/', mainController);
router.get('/pre-search', preSearchController);
router.get('/test', testController);
router.get('/artist', artistController);
router.post('/login', login);
router.post('/refresh');
router.post('/user', user);

export default router;
