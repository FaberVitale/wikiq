//@flow
import type { State, WikiArticleInfo, Thumbnail } from "../reducers";

type ChangeThemeType = "CHANGE_THEME";
type FetchSearchType = "FETCH_SEARCH";
type StoreSerchType = "STORE_SEARCH";
type FailedToFetchSearchType = "FAILED_TO_FETCH_SEARCH";
type StoreThumbnailsType = "STORE_THUMBNAILS";
type FailedToFetchThumbnailsType = "FAILED_TO_FETCH_THUMBNAILS";
type FetchThumbnailsType = "FETCH_THUMBNAILS";

export const CHANGE_THEME: ChangeThemeType = "CHANGE_THEME";

export const FETCH_SEARCH: FetchSearchType = "FETCH_SEARCH";

export const STORE_SEARCH: StoreSerchType = "STORE_SEARCH";

export const FAILED_TO_FETCH_SEARCH: FailedToFetchSearchType =
  "FAILED_TO_FETCH_SEARCH";

export const STORE_THUMBNAILS: StoreThumbnailsType = "STORE_THUMBNAILS";
export const FAILED_TO_FETCH_THUMBNAILS: FailedToFetchThumbnailsType =
  "FAILED_TO_FETCH_THUMBNAILS";

export const FETCH_THUMBNAILS: FetchThumbnailsType = "FETCH_THUMBNAILS";

export type ChangeThemeAction = {|
  +type: ChangeThemeType
|};

export type FetchSearchAction = {|
  +type: FetchSearchType,
  +searchId: string
|};

export type FailedToFetchSearchAction = {|
  +type: FailedToFetchSearchType,
  +searchId: string,
  +error: mixed
|};

export type StoreSearchAction = {|
  +type: StoreSerchType,
  +searchId: string,
  +articles: Array<WikiArticleInfo>,
  +ids: Array<string>,
  +thumbnails: { [id: String]: Thumbnail }
|};

export type FailedToFetchThumbnailsAction = {|
  +type: FailedToFetchThumbnailsType,
  +searchId: string
|};

export type StoreThumbnailsAction = {|
  +type: StoreThumbnailsType,
  +searchId: string,
  +thumbnails: { [id: String]: Thumbnail }
|};

export type FetchThumbnailsAction = {|
  +type: FetchThumbnailsType,
  +searchId: string
|};

export type Action =
  | ChangeThemeAction
  | FetchSearchAction
  | StoreSearchAction
  | StoreThumbnailsAction
  | FailedToFetchSearchAction
  | FailedToFetchThumbnailsAction
  | FetchThumbnailsAction;

/* eslint-disable no-use-before-define */
export type Dispatch = (action: Action | ThunkAction) => void;
/* eslint-enable no-use-before-define */

export type ThunkAction = (dispatch: Dispatch, getState: () => State) => void;
