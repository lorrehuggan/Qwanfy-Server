import { spotifyApi } from '../../app';
import { Request, Response } from 'express';
import { Artist, Body, Curated, Item } from '../../lib/types';
import { log } from 'console';

export const mainController = async (req: Request, res: Response) => {
  const { track, artist } = req.query;

  //----->object store<------
  let searchedArtist = {} as Item;
  let recommendedArtists = [] as Artist[];
  let topTracks = [] as Curated[];

  //-------> search for track <-------
  if (track || artist) {
    try {
      const response = await spotifyApi.searchTracks(
        `${track ? `track:${track}` : `artist:${artist}`}`
      );
      if (response.statusCode === 200) {
        const data = response.body as Body;
        searchedArtist = data.tracks.items[0];
      }
    } catch (error: any) {
      res.send({ error: error.message });
    }
  } else {
    res.send({ error: 'No track or artist provided' });
  }

  //------>Search for recommendations<-----
  if (searchedArtist) {
    const artistID = searchedArtist.artists[0].id;
    const response = await spotifyApi.getArtistRelatedArtists(artistID);
    if (response.statusCode === 200) {
      const data = response.body.artists as Artist[];
      recommendedArtists = data;
    }
  } else {
    res.send({ error: 'unauthorized error' });
  }

  //-------->Get recommended artist top tracks<--------
  if (recommendedArtists.length > 0) {
    const artistIDs = recommendedArtists.map((artist) => artist.id);
    const response = await Promise.all(
      artistIDs.map((id) => spotifyApi.getArtistTopTracks(id, 'US'))
    );
    const data = response.map((data) => {
      return data.body.tracks;
    });

    data.forEach((item) => {
      topTracks.push(
        {
          id: item[1].id,
          name: item[1].name,
          artist: item[1].artists,
          album: item[1].album.name,
          preview_url: item[1].preview_url,
          images: item[1].album.images,
          albumURL: item[1].album.external_urls.spotify,
          popularity: item[1].popularity,
          explicit: item[1].explicit,
          duration: item[1].duration_ms,
        },
        {
          id: item[2].id,
          name: item[2].name,
          artist: item[2].artists,
          album: item[2].album.name,
          preview_url: item[2].preview_url,
          images: item[2].album.images,
          albumURL: item[2].album.external_urls.spotify,
          popularity: item[2].popularity,
          explicit: item[2].explicit,
          duration: item[2].duration_ms,
        },
        {
          id: item[3].id,
          name: item[3].name,
          artist: item[3].artists,
          album: item[3].album.name,
          preview_url: item[3].preview_url,
          images: item[3].album.images,
          albumURL: item[3].album.external_urls.spotify,
          popularity: item[3].popularity,
          explicit: item[3].explicit,
          duration: item[3].duration_ms,
        }
      );
    });
  } else {
    res.send({ error: 'no recommendations' });
  }

  //Get audio features for artist top tracks
  if (topTracks.length > 0) {
    const response = await Promise.all(
      topTracks.map((track) => spotifyApi.getAudioFeaturesForTrack(track.id))
    );
    const data = response.map((data, i) => {
      const track = topTracks[i];
      return {
        features: { ...data.body },
        data: { ...track },
        origin: {
          trackName: searchedArtist.name,
          artistName: searchedArtist.artists[0].name,
          img: searchedArtist.album.images,
        },
      };
    });
    res.send(data);
  } else {
    res.send({ error: 'no audio features' });
  }
  //Create object with selected data
};