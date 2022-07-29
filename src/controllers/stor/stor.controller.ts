import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../error/Error';
import { spotifyApi } from '../../app';

export async function newReleasesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(ApiError.badRequest('Authorization header is missing'));
    return;
  }
  if (authorization !== process.env.AUTH_TOKEN) {
    next(ApiError.badRequest('Authorization token is invalid'));
    return;
  }
  const response = await spotifyApi.getNewReleases();
  if (response.statusCode === 200) {
    const data = response.body.albums.items;
    res.send({ error: '', data });
  } else {
    next(ApiError.badRequest('No results found'));
  }
}
