//@flow
import type { State, Search } from "../reducers";
import { fetchStates } from "../reducers";
import type { WikiArticle, Theme } from "../reducers";

/* returns the theme picked  */
export const getTheme: (state: State) => Theme = state => state.theme;

/* returns the search object that has key searchId, if present, null otherwise */
export const getSearch: (state: State, searchId: string) => Search | null = (
  state,
  searchId
) => state.searches[searchId] || null;

/* if an error has occurred returns a descriptive message about the error,
 * null otherwise
 */
export const getError: (state: State, searchId: string) => string | null = (
  state,
  searchId
) => {
  const search = getSearch(state, searchId);

  return search && search.error;
};

/* if search is present and has been fetched successfully,
 * returns the articles for which the app has requested the thumbnails,
 * null otherwise
 */
export const getArticles: (
  state: State,
  searchId: string
) => Array<WikiArticle> | null = (state: State, searchId: string) => {
  const search = getSearch(state, searchId);

  if (!(search && search.ids)) {
    return null;
  }

  const ids = search.ids;
  const len = Math.min(ids.length, search.thumbnails);
  const res = [];

  for (let i = 0; i < len; i++) {
    let id = ids[i];

    res.push({
      info: state.articles[id],
      thumbnail: state.thumbnails[id] || null
    });
  }
  return res;
};

/* true if the searchId has more thumbnails not dowloaded,
 * false if search is not present or we have not finished to fetch search
 */
export const hasMoreThumbnails: (state: State, searchId: string) => boolean = (
  state,
  searchId
) => {
  const search = getSearch(state, searchId);

  if (search && search.ids) {
    return search.ids.length - search.thumbnails > 0;
  }
  return false;
};

/* true if it the application is fetching thumbnails of the search
 * identified by searchId
 */
export const isFetchingThumbnails: (
  state: State,
  searchId: string
) => boolean = (state, searchId) => {
  const search = getSearch(state, searchId);

  return !!search && search.fetchState === 2;
};

/* Do not make the request if:
 * 1 - we are already fetching
 * 2 - search has already been downloaded */
export const shouldFetchSearch: (state: State, searchId: string) => boolean = (
  state,
  searchId
) => {
  const search = getSearch(state, searchId);

  return !(search && (search.ids || search.fetchState !== fetchStates.IDLE));
};
