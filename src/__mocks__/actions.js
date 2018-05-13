import * as actionTypes from "../action/types";
import { ids, articles, thumbnails } from "./reducers";
import { PAGINATION_SIZE } from "../config";

export const lang = "en";
export const searchId = "en/rem";

const actionSearchId = {
  searchId
};

export const error = { message: "oops!" };

export const fetchSearch = {
  ...actionSearchId,
  type: actionTypes.FETCH_SEARCH
};
export const fetchThumbnails = {
  ...actionSearchId,
  type: actionTypes.FETCH_THUMBNAILS
};
export const failedToFetch = {
  ...actionSearchId,
  type: actionTypes.FAILED_TO_FETCH_SEARCH,
  error
};

export const storeSearch = {
  ...actionSearchId,
  type: actionTypes.STORE_SEARCH,
  articles,
  thumbnails: ids.slice(0, PAGINATION_SIZE).reduce((aggr, next) => {
    let thumbnail = thumbnails[next];
    if (thumbnail) {
      aggr[next] = thumbnail;
    }
    return aggr;
  }, {}),
  ids
};

export const storeThumbnails = {
  ...actionSearchId,
  type: actionTypes.STORE_THUMBNAILS
};
export const failedToFetchThumbnails = {
  ...actionSearchId,
  type: actionTypes.FAILED_TO_FETCH_THUMBNAILS
};
export const changeTheme = { type: actionTypes.CHANGE_THEME };
export const unknown = { type: "@@UNKNOWN" };
