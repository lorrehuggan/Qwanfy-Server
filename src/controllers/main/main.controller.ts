import { spotifyApi } from '../../app';
import { Request, Response, NextFunction } from 'express';
import { Artist, Curated } from '../../lib/types';
import { ApiError } from '../../error/Error';

export const mainController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let ID = '';
  const { authorization } = req.headers;
  console.log(authorization);

  // if (accessToken) {
  //   spotifyApi.setAccessToken(accessToken);
  // }
  if (!authorization) {
    next(ApiError.badRequest('Authorization header is missing'));
    return;
  }
  if (authorization !== process.env.AUTH_TOKEN) {
    next(ApiError.badRequest('Authorization token is invalid'));
    return;
  }
  //----->object store<------
  let recommendedArtists = [] as Artist[];
  let topTracks = [] as Curated[];
  let queryArtist = {
    name: '',
    id: '',
    image: '',
    followers: 0,
    url: '',
    rating: 0,
  };
  //------>Search for recommendations<-----
  if (req.query.id) {
    ID = req.query.id as string;
  } else {
    next(ApiError.badRequest('Bad request something went wrong'));
  }
  if (ID) {
    const response = await spotifyApi.getArtistRelatedArtists(ID);
    if (response.statusCode === 200) {
      const data = response.body.artists as Artist[];
      recommendedArtists = data;
    }
    const artist = await spotifyApi.getArtist(ID);
    if (artist.statusCode === 200) {
      queryArtist = {
        name: artist.body.name,
        id: artist.body.id,
        image: artist.body.images[0].url,
        followers: artist.body.followers.total,
        url: artist.body.external_urls.spotify,
        rating: artist.body.popularity,
      };
    }
  } else {
    next(ApiError.badRequest('Bad request something went wrong'));
  }
  //-------->Get recommended artist top tracks<--------
  if (recommendedArtists.length > 0) {
    try {
      const artistIDs = recommendedArtists.map((artist) => artist.id);
      const response = await Promise.all(
        artistIDs.map((id) => spotifyApi.getArtistTopTracks(id, 'US'))
      );
      const data = response.map((data) => {
        return data.body.tracks;
      });
      if (data) {
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
              trackURL: item[1].external_urls.spotify,
              popularity: item[1].popularity,
              explicit: item[1].explicit,
              duration: item[1].duration_ms,
              trackURI: item[1].uri,
            },
            {
              id: item[2].id,
              name: item[2].name,
              artist: item[2].artists,
              album: item[2].album.name,
              preview_url: item[2].preview_url,
              images: item[2].album.images,
              albumURL: item[2].album.external_urls.spotify,
              trackURL: item[2].external_urls.spotify,
              popularity: item[2].popularity,
              explicit: item[2].explicit,
              duration: item[2].duration_ms,
              trackURI: item[2].uri,
            },
            {
              id: item[3].id,
              name: item[3].name,
              artist: item[3].artists,
              album: item[3].album.name,
              preview_url: item[3].preview_url,
              images: item[3].album.images,
              albumURL: item[3].album.external_urls.spotify,
              trackURL: item[3].external_urls.spotify,
              popularity: item[3].popularity,
              explicit: item[3].explicit,
              duration: item[3].duration_ms,
              trackURI: item[3].uri,
            }
          );
        });
      } else {
        next(ApiError.badRequest('Bad request something went wrong'));
      }
    } catch (error: any) {
      next(ApiError.badRequest('Bad request something went wrong'));
    }
  } else {
    next(ApiError.badRequest('Bad request something went wrong'));
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
        query: { ...queryArtist },
      };
    });
    res.send({ error: '', data });
  } else {
    next(ApiError.badRequest('Bad request something went wrong'));
  }
};
