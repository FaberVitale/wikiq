//@flow

/* wikipedia versions available */
export const LOCALES = [
  "en",
  "es",
  "fr",
  "ru",
  "it",
  "de",
  "pt",
  "sv",
  "nl",
  "pl",
  "ja",
  "ceb",
  "vi",
  "war"
];
/* maps locales to adjective */
export const LOCALES_TO_LANGUAGE = {
  en: "English",
  es: "Spanish",
  fr: "French",
  ru: "Russian",
  it: "Italian",
  de: "German",
  pt: "Portuguese",
  nl: "Dutch",
  sv: "Swedish",
  pl: "Polish",
  ja: "Japanese",
  ceb: "Cebuano",
  war: "Waray-Waray",
  vi: "Vietnamese"
};

// Routes of this application
export const routes = {
  home: "/",
  search: `/:lang(${LOCALES.join("|")})/:query(\\S.*)`
};

//dom element where ReactDOM mounts the application
export const REACT_ROOT_ID = "root";

//max len of description allowed, applies ellipsis if longer
export const ELLIPSIS_DESCRIPTION_THRESHOLD = 300;

//max len of title allowed, applies ellipisis if longer
export const ELLIPSIS_TITLE_THRESHOLD = 50;

// max number of results of an open Search query (max allowed is 500)
// see: https://www.mediawiki.org/wiki/API:Opensearch
export const OPEN_SEARCH_LIMIT = 80;

// wikipedia supports up to 10 titles in a query action
export const PAGINATION_SIZE = 10;

//Min height of appBar, <Main> is displayed below it
export const APPBAR_MIN_HEIGHT = 64;

/* length of a side of a Card in pixel (border-box) */
export const CARD_SIDE = 280;

/* margin top and margin-bottom of card */
export const CARD_MARGIN = 16;

/* width of the thunbail displayed */
export const THUMBNAIL_WIDTH = 300;

// displayed when the app fails to load Main or a query
export const ERROR_MESSAGE =
  "An Error has occurred, check your connection then refresh";

// displayed when there arent more thumbnails to load
export const SEARCH_COMPLETED = "✔ Done";

// displayed when the query returned 0 results
export const NO_RESULTS = "0 results found";

// throttle time span used by ScrollListener
export const SCROLL_LISTENER_THROTTLE = 200;

// if window has scrolled more than threshold Back to Top button will be visible
export const BACK_TO_TOP_THRESHOLD = 300;

//throttle timespan of change theme
export const CHANGE_THEME_THROTTLE_TIME = 300;

// Application name displayed
export const APP_TITLE = "Wikiq";
