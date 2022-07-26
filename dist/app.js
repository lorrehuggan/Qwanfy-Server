"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyApi = void 0;
const express_1 = __importDefault(require("express"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const index_1 = __importDefault(require("./routes/main/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = require("./error/ErrorHandler");
dotenv_1.default.config();
exports.spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
exports.spotifyApi
    .clientCredentialsGrant()
    .then(function (result) {
    exports.spotifyApi.setAccessToken(result.body.access_token);
})
    .catch(function (err) {
    console.log(err);
});
app.use('/api/main', index_1.default);
app.use(ErrorHandler_1.ErrorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
