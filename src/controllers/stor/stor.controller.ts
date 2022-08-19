import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../error/Error';
import { spotifyApi } from '../../app';
import { log } from 'console';

let scopes = ['user-read-private', 'user-read-email'];
let state = 'some-state-of-my-choice';

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

  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  //console.log(authorizeURL);

  let code =
    'AQCX3ZPMA7GOL3hImLMyX_k8Y8QMyHrmy5W0uRCqBPD_SEnrH3y4HwbcwnnlZmv_ApKHyvbLCiwb0JwWkIBukLLSTnTG_GZPdbsx_ABNIM2qEDMuCTmVXIIqjt0-bcyXZomUB__5HD4pueosDaKgcC78b_mE9jh8RjkFwstrtwDHSAddaWGNIx0wup8l6Kxo71TFB5cU6vAvzhznGm4';

  //const dataMe = await spotifyApi.getMe();

  // const response = await spotifyApi.getNewReleases();
  // if (response.statusCode === 200) {
  //   const data = response.body.albums.items;
  //   res.send({
  //     error: '',
  //     dataMe: dataMe,
  //     x: GET_URL_RESPONSE_TOKEN(code),
  //   });
  // } else {
  //   next(ApiError.badRequest('No results found'));
  // }
}
