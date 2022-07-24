import { spotifyApi } from '../../app';
import { NextFunction, Request, Response } from 'express';
import { Body, Item } from '../../lib/types';

export const preSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { track, artist } = req.query;

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
          res.send(filteredArray);
        }
        if (track) {
          res.send(data);
        }
      }
    } catch (error: any) {
      res.status(404).send({ error: error.message });
    }
  } else {
    res.send({ error: 'No track or artist provided' });
  }
};
