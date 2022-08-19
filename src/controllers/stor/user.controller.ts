import { spotifyApi } from './../../app';
import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../error/Error';

const scopes = [
  'ugc-image-upload',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'app-remote-control',
  'playlist-modify-public',
  'user-modify-playback-state',
  'playlist-modify-private',
  'user-follow-modify',
  'user-read-currently-playing',
  'user-follow-read',
  'user-library-modify',
  'user-read-playback-position',
  'playlist-read-private',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'playlist-read-collaborative',
  'streaming',
];

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(spotifyApi.createAuthorizeURL(scopes, 'state'));
    res.send({ done: true });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};

export const callback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code as string);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 10 });

    res.send({ refresh_token, access_token, user, userTopArtists });
  } catch (error: any) {
    next(ApiError.badRequest(error.message));
  }
};
