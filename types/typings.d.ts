import { type } from "os";

type TUser = {
    username: string;
    email: string;
    password?: string;
}

type TUserDataError = {
  username: {
      message?: string;
  };
  email: {
      message?: string;
  };
  password: {
      message?: string;
      containsEnoughCharacters?: boolean;
      containsUpperCaseCharacter?: boolean;
      containsLowerCaseCharacter?: boolean;
      containsNumber?: boolean;
  };
}

type TComment = {
  text: string,
  rating: number, 
  createdAt: number,
}

type TReview = {
    user: TUser,
    comment: TComment,
}

type TTrip = {
  address: {
    city: string;
    country: string;
  }
  kinds: string;
  sources: {
    geometry: string;
    attributes: string[];
  };
  bbox: {
    lat_max: number;
    lat_min: number;
    lon_max: number;
    lon_min: number;
  };
  point: {
    lon: number;
    lat: number;
  };
  wikipedia_extracts?: {
    text: string;
    html: string;
    title: string;
  };
  preview?: {
    source: string;
    height: number;
    width: number;
  };
  osm: string;
  otm: string;
  xid: string;
  name: string;
  wikipedia: string;
  image: string;
  wikidata: string;
  rate?: string;
  info?: {
    descr: string;
    image: string;
    img_width: number;
    src: string;
    src_id: number;
    img_height: number;
  };
};

type TGeoname = {
    name: string,
    country: string,
    lat: number,
    lon: number,
    population: number,
    timezone: string | null,
    status: string
  }

type TBuildingKind = "architecture" | "other_buildings_and_structures" | "historic_architecture" | 
"interesting_places"

type TPoint = {
    lon: number,
    lat: number,
}

type TGeometry = {
    cordinates: TPoint,
    type: string,
}

type TFeature = {
    type: string,
    id: string,
    geometry: TGeometry,
    properties: TRadius,
}

type TRadiusApiResponse = {
    type: string;
    features: TFeature[];
}

type TRadius = 
    {
      dist: number,
      name: string,
      osm: string,
      xid: string,
      wikidata: string,
      kind: TBuildingKind,
      point: TPoint
    }

export { TUser, TUserData, TUserDataError, TTrip, TGeoname, TRadius, TRadiusApiResponse, TComment, TReview }