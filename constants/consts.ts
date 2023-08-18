import { Cinzel_Decorative } from "next/font/google";

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700", "900"],
    subsets: ["latin"],
  });

  const RADIUS = '10000';
  const LIMIT = '10';

  const BASE_API_URL = 'https://api.opentripmap.com/0.1';
  const BASE_API_URL_GEONAME = `${BASE_API_URL}/en/places/geoname`;
  const BASE_API_URL_RADIUS = `${BASE_API_URL}/en/places/radius`;
  const BASE_API_URL_AUTOSUGGEST = `${BASE_API_URL}/en/places/autosuggest`;
  const BASE_API_URL_XID = `${BASE_API_URL}/en/places/xid`;

  const MIN_PASSWORD_LENGTH = 6;
  const MAX_PASSWORD_LENGTH = 15;

  const emailRegex = /[a-z0-9][a-z0-9_.]+@[a-z0-9_]+\.(com|[a-z]{2})$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;

  const dateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' } as const; 


  const loginAndRegister__messageVariants = {
    hidden: {
        opacity: 0,
        y: -5,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -5,
    },
};

  export { cinzelDecorative, RADIUS, LIMIT, BASE_API_URL_GEONAME, BASE_API_URL_RADIUS, 
    BASE_API_URL_AUTOSUGGEST, BASE_API_URL_XID, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, 
    emailRegex, usernameRegex, passwordRegex, loginAndRegister__messageVariants,
    dateTimeFormatOptions };