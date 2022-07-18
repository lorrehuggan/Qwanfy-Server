import { spotifyApi } from '../../app';
import { Request, Response } from 'express';
import { Body, Item } from '../../lib/types';

export const preSearchController = async (req: Request, res: Response) => {
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
          res.send(response.body.artists);
        }
        if (track) {
          res.send(data);
        }
      }
    } catch (error: any) {
      res.send({ error: error.message });
    }
  } else {
    res.send({ error: 'No track or artist provided' });
  }
};
