import { spotifyApi } from '../../app';
import { NextFunction, Request, Response } from 'express';
import { Body } from '../../lib/types';
import { ApiError } from '../../error/Error';

export const preSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { track, artist } = req.query;

  const { authorization } = req.headers;

  // if (!authorization) {
  //   next(ApiError.badRequest('Authorization header is missing'));
  //   return;
  // }

  // if (authorization !== process.env.AUTH_TOKEN) {
  //   next(ApiError.badRequest('Authorization token is invalid'));
  //   return;
  // }

  //-------> search for track <-------
  if (track || artist) {
    try {
      const response = await spotifyApi.searchTracks(
        `${track ? `track:${track}` : `artist:${artist}`}`
      );
      if (response.statusCode === 200) {
        const data = response.body as Body;
        if (artist) {
          const artistIDs = data.tracks.items.map((artist) => {
            return artist.artists[0].id;
          });
          const response = await spotifyApi.getArtists(artistIDs);
          const filteredArray = response.body.artists.filter(
            (obj, index, arr) => {
              return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === index;
            }
          );
          res.send({ error: '', data: filteredArray });
        }
        if (track) {
          res.send({ error: '', data });
        }
      } else {
        next(ApiError.badRequest('No results found'));
      }
    } catch (error: any) {
      next({});
    }
  } else {
    next(ApiError.badRequest('Missing track or artist'));
    return;
  }
};
