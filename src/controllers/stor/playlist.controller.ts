import { spotifyApi } from './../../app';
import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../error/Error';

export const createPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access, playlistName, tracks, publicPlaylist } = req.body;

  spotifyApi.setAccessToken(access);

  try {
    const createPlaylist = await spotifyApi.createPlaylist(playlistName, {
      collaborative: false,
      public: publicPlaylist,
    });
    const playlistId = createPlaylist.body.id;
    const addTracks = await spotifyApi.addTracksToPlaylist(playlistId, tracks);
    res.status(200).send({ error: '', data: addTracks.body });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};
