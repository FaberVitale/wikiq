//@flow
import {
  CHANGE_THEME,
  FETCH_SEARCH,
  STORE_SEARCH,
  FAILED_TO_FETCH_SEARCH,
  FAILED_TO_FETCH_THUMBNAILS,
  STORE_THUMBNAILS,
  FETCH_THUMBNAILS,
} from "./types";
import type { ChangeThemeAction, Dispatch, ThunkAction } from "./types";
import {
  makeSearchId,
  getOpenSearchURL,
  encodeComponent,
  fetchJSON,
  transformSearch,
  getThumbnailURL,
  extractThumbnails,
} from "../util/query";
import {
  shouldFetchSearch,
  hasMoreThumbnails,
  isFetchingThumbnails,
  getTheme,
} from "../selectors";
import {
  OPEN_SEARCH_LIMIT,
  PAGINATION_SIZE,
  THUMBNAIL_WIDTH,
  CARD_SIDE,
} from "../config";
import { warn } from "../util/functions";
import debounce from "lodash.debounce";
import { $localStorage } from "../util/dom";

export const changeTheme: () => ChangeThemeAction = () => ({
  type: CHANGE_THEME,
});

export const fetchSearch = (searchId: string) => ({
  type: FETCH_SEARCH,
  searchId,
});

export const fetchThumbnails = (searchId: string) => ({
  type: FETCH_THUMBNAILS,
  searchId,
});

export const storeSearch = (lang: string, searchId: string, data: any) => ({
  type: STORE_SEARCH,
  searchId,
  articles: data.articles,
  ids: data.ids,
  thumbnails: data.thumbnails,
});

export const failedToFetchSearch = (searchId: string, error: mixed) => ({
  type: FAILED_TO_FETCH_SEARCH,
  searchId,
  error,
});

export const failedToFetchThumbnails = (searchId: string) => ({
  type: FAILED_TO_FETCH_THUMBNAILS,
  searchId,
});

export const storeThumbnails = (searchId: string, thumbnails: any) => ({
  type: STORE_THUMBNAILS,
  searchId,
  thumbnails,
});

/* function that fetches the open search and the first PAGINATION_SIZE thumbnails */
const fetchSearchAndThumbnails = (
  lang: string,
  escapedQuery: string,
  searchId: string,
  dispatch: Dispatch
) => {
  const searchURL = getOpenSearchURL(lang, escapedQuery, OPEN_SEARCH_LIMIT);

  const onSearchNotReceived = (e) => {
    warn("Unable to fetch search\n", e);
    dispatch(failedToFetchSearch(searchId, e));
  };

  const onSearchReceived = (data) => {
    const { articles, ids } = transformSearch(lang, data);
    let thumbnails = {};

    const titles = articles
      .slice(0, PAGINATION_SIZE)
      .map((article) => article.title);

    const thumbnailURL = getThumbnailURL(lang, titles, THUMBNAIL_WIDTH);

    const onThumbnailsReceived = (json) => {
      if (json && json.query && json.query.pages) {
        thumbnails = extractThumbnails(lang, json.query.pages);
      }
    };

    const finallyDispatch = (_: mixed) => {
      dispatch(storeSearch(lang, searchId, { ids, articles, thumbnails }));
    };

    /* fetch thumbnails
     *   -> extract thumbnails if successful - emit a warning  otherwise
     *        -> finally dispatch result
     */
    fetchJSON(thumbnailURL)
      .then(onThumbnailsReceived, warn)
      .then(finallyDispatch);
  };
  const cb = () => {
    fetchJSON(searchURL).then(onSearchReceived, onSearchNotReceived);
  };

  const timeout = 400;

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(cb, { timeout });
  } else {
    setTimeout(cb, timeout - 200);
  }
};

/* action creator that dispatches a thunk that will fetch Search and thumbnails
 * if necessary */
export const requestSearch: (lang: string, query: string) => ThunkAction = (
  lang,
  query
) => {
  const escapedQuery = encodeComponent(query);

  const searchId = makeSearchId(lang, query);

  return (dispatch, getState) => {
    if (!shouldFetchSearch(getState(), searchId)) {
      return;
    }
    // notify the reducers that we are fetching
    dispatch(fetchSearch(searchId));

    fetchSearchAndThumbnails(lang, escapedQuery, searchId, dispatch);
  };
};

/* action creator that schedules a fetch of more thumbnails
 * if it is possible/allowed
 */
export const requestMoreThumbnails: (
  lang: string,
  searchId: string
) => ThunkAction = (lang, searchId) => {
  return (dispatch, getState) => {
    const state = getState();

    if (isFetchingThumbnails(state, searchId)) {
      return;
    }

    if (!hasMoreThumbnails(state, searchId)) {
      warn(
        `Attempted to load more thumbnails than possible, searchId: ${searchId}`
      );
      return;
    }

    /* notify that we are fetching, in order to not load the same resource
     * more than once at the same time
     */
    dispatch(fetchThumbnails(searchId));

    const cb = () => dispatch(loadMoreThumbnails(lang, searchId));
    const timeout = 300;

    /* schedule a dispatch of a thunk that will load the thumbnails
     * using requestIdleCallback if possible
     */
    if (typeof window !== undefined && "requestIdleCallback" in window) {
      window.requestIdleCallback(cb, { timeout });
    } else {
      setTimeout(cb, timeout);
    }
  };
};

const onLoadMoreThumbnailsSuccess = (
  dispatch: Dispatch,
  lang: string,
  searchId: string
) => (data) => {
  let receivedThumbnails = {};

  if (data && data.query && data.query.pages) {
    receivedThumbnails = extractThumbnails(lang, data.query.pages);
  }

  dispatch(storeThumbnails(searchId, receivedThumbnails));
};

const onLoadMoreThumbnailsFail = (
  dispatch: Dispatch,
  lang: string,
  searchId: string
) => (err) => {
  warn(
    `Unable to Load More  thumbnails: lang - ${lang} searchId -  ${searchId}\n`,
    err
  );

  dispatch(failedToFetchThumbnails(searchId));
};

/* thunk that fetches thumbnails, it shouldnt be called directly,
 * call requestMoreThumbnails instead
 */
const loadMoreThumbnails: (lang: string, searchId: string) => ThunkAction = (
  lang,
  searchId
) => {
  return (dispatch, getState) => {
    const state = getState();

    const { thumbnails, ids } = state.searches[searchId];
    const onFulFill = onLoadMoreThumbnailsSuccess(dispatch, lang, searchId);
    const onRejection = onLoadMoreThumbnailsFail(dispatch, lang, searchId);

    if (!Array.isArray(ids)) {
      onRejection(new Error(`expected ids to be an array got ${String(ids)}`));
      return;
    }

    const titles = ids
      .slice(thumbnails, thumbnails + PAGINATION_SIZE)
      .map((id) => state.articles[id].title);

    const thumbnailURL = getThumbnailURL(lang, titles, CARD_SIDE);

    fetchJSON(thumbnailURL).then(onFulFill, onRejection);
  };
};

const persistTheme = debounce(
  (theme: string) => {
    if (!$localStorage) {
      return;
    }
    try {
      $localStorage.setItem("theme", theme);
    } catch (e) {
      warn(`unable to persist theme: ${theme}`);
    }
  },
  1000,
  { leading: false }
);

export const requestChangeTheme: () => ThunkAction = (theme) => {
  return (dispatch: Dispatch, getState) => {
    dispatch(changeTheme());

    persistTheme(getTheme(getState()));
  };
};
