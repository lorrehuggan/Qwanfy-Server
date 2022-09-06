import { spotifyApi } from './../../app';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../error/Error';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  try {
    const auth = await spotifyApi.authorizationCodeGrant(code);
    const access_token = auth.body.access_token;
    const refresh_token = auth.body.refresh_token;
    const expires_in = auth.body.expires_in;

    //get user
    spotifyApi.setAccessToken(access_token);
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 10 });
    //.....

    res.json({ access_token, refresh_token, expires_in, user, userTopArtists });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  spotifyApi.setRefreshToken(refreshToken);

  try {
    const auth = await spotifyApi.refreshAccessToken();
    const access_token = auth.body.access_token;
    const expires_in = auth.body.expires_in;
    res.json({ access_token, expires_in });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};
