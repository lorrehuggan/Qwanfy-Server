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
    const accessToken = auth.body.access_token;
    const refreshToken = auth.body.refresh_token;
    const expiresIn = auth.body.expires_in;

    res.json({ accessToken, refreshToken, expiresIn });
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
    const accessToken = auth.body.access_token;
    const expiresIn = auth.body.expires_in;
    res.json({ accessToken, expiresIn });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};
