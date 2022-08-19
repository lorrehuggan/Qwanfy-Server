import { spotifyApi } from './../../app';
import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../error/Error';

export const user = async (req: Request, res: Response, next: NextFunction) => {
  const { access_token, refresh_token } = req.body;

  try {
    spotifyApi.setAccessToken(access_token);

    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 10 });

    res.send({ refresh_token, access_token, user, userTopArtists });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};
