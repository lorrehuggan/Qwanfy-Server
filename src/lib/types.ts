export interface Search {
  body: Body;
  headers: Headers;
  statusCode: number;
}

export interface Body {
  tracks: Tracks;
}
export interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  uri: string;
}

export interface Curated {
  id: string;
  name: string;
  artist: SpotifyApi.ArtistObjectSimplified[];
  album: string;
  preview_url: null | string;
  images: SpotifyApi.ImageObject[];
  albumURL: string;
  popularity: number;
  explicit: boolean;
  duration: number;
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: ItemType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Single = 'single',
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: Type;
  uri: string;
}

export enum Type {
  Artist = 'artist',
}

export interface Followers {
  href: null;
  total: number;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year',
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = 'track',
}

export interface Headers {
  'content-type': string;
  'cache-control': string;
  'x-robots-tag': string;
  'access-control-allow-origin': string;
  'access-control-allow-headers': string;
  'access-control-allow-methods': string;
  'access-control-allow-credentials': string;
  'access-control-max-age': string;
  'content-encoding': string;
  'strict-transport-security': string;
  'x-content-type-options': string;
  date: string;
  server: string;
  via: string;
  'alt-svc': string;
  connection: string;
  'transfer-encoding': string;
}
