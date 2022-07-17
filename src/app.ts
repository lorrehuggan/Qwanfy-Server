import express, { Application, Request, Response, NextFunction } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mainRoutes from './routes/main/index';
import dotenv from 'dotenv';

dotenv.config();

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
});

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

spotifyApi
  .clientCredentialsGrant()
  .then(function (result) {
    spotifyApi.setAccessToken(result.body.access_token);
  })
  .catch(function (err) {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.use('/api/main', mainRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});