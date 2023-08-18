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


/* 
Trip returned from api
{
  "kinds": "architecture,towers,interesting_places,bell_towers",
  "sources": {
    "geometry": "osm",
    "attributes": [
      "osm",
      "user",
      "wikidata"
    ]
  },
  "bbox": {
    "lat_max": 59.857355,
    "lat_min": 59.857242,
    "lon_max": 38.366282,
    "lon_min": 38.366043
  },
  "point": {
    "lon": 38.366169,
    "lat": 59.857269
  },
  "osm": "way/286786280",
  "otm": "https://opentripmap.com/ru/card/W286786280",
  "xid": "W286786280",
  "name": "Bellfry",
  "wikipedia": "https://ru.wikipedia.org/wiki/Колокольня_(Кирилло-Белозерский_монастырь)",
  "image": "https://data.opentripmap.com/images/user/Kirillo-Belozersky Belltower.jpg/original.jpg",
  "wikidata": "Q4228276",
  "rate": "3h",
  "info": {
    "descr": "Колокольня построена во второй половине XVIII века. Это одно из самых высоких сооружений монастыря. Колокольня состоит из 4 глухих этажей, над которыми возвышается один открытый. В XVIII веке на колокольне было 26 колоколов, самый большойиз них весил около 20 тонн, получивший имя «Мотора». Его звон был слышен в радиусе 20 километров.К сожалению,  в настоящее время на колокольне нет колоколов: их начали снимать при Петре I, когда во время Северной войны четвёртая часть монастырских колоколов (общим весом около 6,5 тонн) пошла на пополнение снаряжения армии. А в годы  советской власти почти всё собрание монастырских звонов было уничтожено.  В 1930 – 1931 годах из монастыря было вывезено свыше 31 тонны колокольной бронзы.\nВ 2006-2007 годахпроведены реставрационные работы. В настоящее время на 3–4 ярусах находится выставка «Колокольный мир», здесь экспонируютсямузейное собрание колоколов и механизм боевых часовна четвертом ярусе колокольни, а ярус звона в летний период открыт для посещения. На колокольне работает Web-камера, через которую можно полюбоваться видом на Соборную площадь в любое время дня и ночи.",
    "image": "1 (1) (Large)",
    "img_width": 1620,
    "src": "belozersk",
    "src_id": 13,
    "img_height": 1080
  }
}
*/

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

type TBuildingKind = "architecture" | "other_buildings_and_structures" | "historic_architecture" | "interesting_places"

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