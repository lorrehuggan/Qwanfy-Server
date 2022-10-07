import express, { Application } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mainRoutes from './routes/main/index';
import storRoutes from './routes/stor/index';
import dotenv from 'dotenv';
import { ErrorHandler } from './error/ErrorHandler';

dotenv.config();

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // accessToken: process.env.ACCESS_TOKEN,
  redirectUri: 'http://sazaana.com/',
  refreshToken: '',
});

const app: Application = express();
const PORT = process.env.PORT || 5000;

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

app.use('/api/main', mainRoutes);
app.use('/api/stor', storRoutes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
