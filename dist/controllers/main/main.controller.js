"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainController = void 0;
const app_1 = require("../../app");
const Error_1 = require("../../error/Error");
const mainController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let ID = '';
    const { authorization } = req.headers;
    if (!authorization) {
        next(Error_1.ApiError.badRequest('Authorization header is missing'));
        return;
    }
    if (authorization !== process.env.AUTH_TOKEN) {
        next(Error_1.ApiError.badRequest('Authorization token is invalid'));
        return;
    }
    //----->object store<------
    let recommendedArtists = [];
    let topTracks = [];
    //------>Search for recommendations<-----
    if (req.query.id) {
        ID = req.query.id;
    }
    else {
        next(Error_1.ApiError.badRequest('Bad request something went wrong'));
    }
    if (ID) {
        const response = yield app_1.spotifyApi.getArtistRelatedArtists(ID);
        if (response.statusCode === 200) {
            const data = response.body.artists;
            recommendedArtists = data;
        }
    }
    else {
        next(Error_1.ApiError.badRequest('Bad request something went wrong'));
    }
    //-------->Get recommended artist top tracks<--------
    if (recommendedArtists.length > 0) {
        try {
            const artistIDs = recommendedArtists.map((artist) => artist.id);
            const response = yield Promise.all(artistIDs.map((id) => app_1.spotifyApi.getArtistTopTracks(id, 'US')));
            const data = response.map((data) => {
                return data.body.tracks;
            });
            if (data) {
                data.forEach((item) => {
                    topTracks.push({
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
                    }, {
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
                    }, {
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
                    });
                });
            }
            else {
                next(Error_1.ApiError.badRequest('Bad request something went wrong'));
            }
        }
        catch (error) {
            next(Error_1.ApiError.badRequest('Bad request something went wrong'));
        }
    }
    else {
        next(Error_1.ApiError.badRequest('Bad request something went wrong'));
    }
    //Get audio features for artist top tracks
    if (topTracks.length > 0) {
        const response = yield Promise.all(topTracks.map((track) => app_1.spotifyApi.getAudioFeaturesForTrack(track.id)));
        const data = response.map((data, i) => {
            const track = topTracks[i];
            return {
                features: Object.assign({}, data.body),
                data: Object.assign({}, track),
            };
        });
        res.send({ error: '', data });
    }
    else {
        next(Error_1.ApiError.badRequest('Bad request something went wrong'));
    }
});
exports.mainController = mainController;
