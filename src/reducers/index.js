//@flow
import { combineReducers } from "redux";
import theme from "./theme";
import type { State as Theme } from "./theme";
import { searches, articles, thumbnails } from "./search";
import type { Searches, Articles, Thumbnails } from "./search";

export { fetchStates } from "./search";

export type State = {|
  +theme: Theme,
  +searches: Searches,
  +articles: Articles,
  +thumbnails: Thumbnails
|};

export type { State as Theme } from "./theme";
export type { Search, Thumbnail, WikiArticle, WikiArticleInfo } from "./search";

export default combineReducers({
  theme,
  searches,
  articles,
  thumbnails
});
