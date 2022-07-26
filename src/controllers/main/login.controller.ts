import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../error/Error';
import { spotifyApi } from '../../app';
import SpotifyWebApi from 'spotify-web-api-node';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/',
  });

  try {
    const auth = await spotifyApi.authorizationCodeGrant(code);
    const access_token = auth.body.access_token;
    const refresh_token = auth.body.refresh_token;
    const expires_in = auth.body.expires_in;
    spotifyApi.setAccessToken(access_token);
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 10 });
    res.send({ access_token, refresh_token, expires_in, user, userTopArtists });
  } catch (error: any) {
    res.json({ message: error.message, data: '' });
  }
};
