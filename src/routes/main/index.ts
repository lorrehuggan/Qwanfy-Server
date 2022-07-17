import express from 'express';
import { mainController } from '../../controllers/main/main.controller';

const router = express.Router();

router.get('/', mainController);

export default router;
