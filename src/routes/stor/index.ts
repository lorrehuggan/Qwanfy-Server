import express from 'express';
import { createPlaylist } from '../../controllers/stor/playlist.controller';
import { newReleasesController } from '../../controllers/stor/stor.controller';
import { callback, getUser } from '../../controllers/stor/user.controller';

const router = express.Router();

router.get('/new', newReleasesController);
router.get('/get-user', getUser);
router.get('/callback', callback);
router.post('/create-playlist', createPlaylist);

export default router;
