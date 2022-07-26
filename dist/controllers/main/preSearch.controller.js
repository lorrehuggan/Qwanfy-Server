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
exports.preSearchController = void 0;
const app_1 = require("../../app");
const Error_1 = require("../../error/Error");
const preSearchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { track, artist } = req.query;
    const { authorization } = req.headers;
    if (!authorization) {
        next(Error_1.ApiError.badRequest('Authorization header is missing'));
        return;
    }
    if (authorization !== process.env.AUTH_TOKEN) {
        next(Error_1.ApiError.badRequest('Authorization token is invalid'));
        return;
    }
    //-------> search for track <-------
    if (track || artist) {
        try {
            const response = yield app_1.spotifyApi.searchTracks(`${track ? `track:${track}` : `artist:${artist}`}`);
            if (response.statusCode === 200) {
                const data = response.body;
                if (artist) {
                    const artistIDs = data.tracks.items.map((artist) => {
                        return artist.artists[0].id;
                    });
                    const response = yield app_1.spotifyApi.getArtists(artistIDs);
                    const filteredArray = response.body.artists.filter((obj, index, arr) => {
                        return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === index;
                    });
                    res.send({ error: '', data: filteredArray });
                }
                if (track) {
                    res.send({ error: '', data });
                }
            }
            else {
                next(Error_1.ApiError.badRequest('No results found'));
            }
        }
        catch (error) {
            next({});
        }
    }
    else {
        next(Error_1.ApiError.badRequest('Missing track or artist'));
        return;
    }
});
exports.preSearchController = preSearchController;
