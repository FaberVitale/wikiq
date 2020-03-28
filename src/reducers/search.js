//@flow
import {
  FETCH_SEARCH,
  STORE_SEARCH,
  FAILED_TO_FETCH_SEARCH,
  STORE_THUMBNAILS,
  FAILED_TO_FETCH_THUMBNAILS,
  FETCH_THUMBNAILS,
} from "../action/types";
import { PAGINATION_SIZE } from "../config";
import type { Action } from "../action/types";

export type WikiArticleInfo = {|
  +title: string,
  +description: string,
  +link: string,
|};

export type Thumbnail = {|
  +source: string,
  +width: number,
  +height: number,
|};

export type WikiArticle = {|
  +info: WikiArticleInfo,
  +thumbnail: Thumbnail | null,
|};

export type Search = {
  ids: Array<string> | null,
  fetchState: number,
  error: null | string,
  thumbnails: number,
};

export type Searches = {
  [id: string]: Search,
};

export type Articles = {
  [articleId: string]: WikiArticleInfo,
};

export type Thumbnails = {
  [articleId: string]: Thumbnail,
};

const DEFAULT_ERROR_MESSAGE = "error";

export const fetchStates = {
  IDLE: 0,
  REQUESTED_SEARCH: 1,
  REQUESTED_THUMBNAILS: 2,
};

Object.freeze(fetchStates);

const searchInitState = {
  ids: null,
  fetchState: fetchStates.IDLE,
  error: null,
  thumbnails: 0,
};

export const search = (state: Search = searchInitState, action: Action) => {
  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        fetchState: fetchStates.REQUESTED_SEARCH,
        error: null,
      };
    case STORE_SEARCH:
      return {
        ...state,
        ids: action.ids,
        fetchState: fetchStates.IDLE,
        error: null,
        thumbnails: PAGINATION_SIZE,
      };
    case FAILED_TO_FETCH_SEARCH:
      const message =
        action.error && typeof action.error.message === "string"
          ? action.error.message
          : DEFAULT_ERROR_MESSAGE;
      return {
        ...state,
        fetchState: fetchStates.IDLE,
        error: message,
      };
    case FETCH_THUMBNAILS:
      return {
        ...state,
        fetchState: fetchStates.REQUESTED_THUMBNAILS,
      };
    case STORE_THUMBNAILS:
    case FAILED_TO_FETCH_THUMBNAILS:
      return {
        ...state,
        thumbnails: state.thumbnails + PAGINATION_SIZE,
        fetchState: fetchStates.IDLE,
      };
    default:
      return state;
  }
};

export const searches = (state: Searches = {}, action: Action) => {
  switch (action.type) {
    case FAILED_TO_FETCH_SEARCH:
    case STORE_SEARCH:
    case FETCH_SEARCH:
    case STORE_THUMBNAILS:
    case FAILED_TO_FETCH_THUMBNAILS:
    case FETCH_THUMBNAILS:
      return {
        ...state,
        [action.searchId]: search(state[action.searchId], action),
      };
    default:
      return state;
  }
};

export const articles = (state: Articles = {}, action: Action) => {
  if (action.type === STORE_SEARCH) {
    const nextState = { ...state };

    const { ids, articles } = action;

    for (let i = 0, len = ids.length; i < len; i++) {
      nextState[ids[i]] = articles[i];
    }

    return nextState;
  }
  return state;
};

export const thumbnails = (state: Thumbnails = {}, action: Action) => {
  switch (action.type) {
    case STORE_SEARCH:
    case STORE_THUMBNAILS:
      return {
        ...state,
        ...action.thumbnails,
      };
    default:
      return state;
  }
};
