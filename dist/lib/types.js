"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = exports.ReleaseDatePrecision = exports.ArtistType = exports.Type = exports.AlbumTypeEnum = void 0;
var AlbumTypeEnum;
(function (AlbumTypeEnum) {
    AlbumTypeEnum["Album"] = "album";
    AlbumTypeEnum["Single"] = "single";
})(AlbumTypeEnum = exports.AlbumTypeEnum || (exports.AlbumTypeEnum = {}));
var Type;
(function (Type) {
    Type["Artist"] = "artist";
})(Type = exports.Type || (exports.Type = {}));
var ArtistType;
(function (ArtistType) {
    ArtistType["Artist"] = "artist";
})(ArtistType = exports.ArtistType || (exports.ArtistType = {}));
var ReleaseDatePrecision;
(function (ReleaseDatePrecision) {
    ReleaseDatePrecision["Day"] = "day";
    ReleaseDatePrecision["Year"] = "year";
})(ReleaseDatePrecision = exports.ReleaseDatePrecision || (exports.ReleaseDatePrecision = {}));
var ItemType;
(function (ItemType) {
    ItemType["Track"] = "track";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
