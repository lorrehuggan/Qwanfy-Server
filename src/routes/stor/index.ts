import express from 'express';
import { newReleasesController } from '../../controllers/stor/stor.controller';

const router = express.Router();

router.get('/new', newReleasesController);

export default router;
