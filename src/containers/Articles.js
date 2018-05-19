//@flow
import { connect } from "react-redux";
import {
  getArticles,
  getError,
  hasMoreThumbnails,
  isFetchingThumbnails
} from "../selectors";
import { makeSearchId } from "../util/query";
import { requestSearch, requestMoreThumbnails } from "../action/creators";
import InfiniteScroller from "./InfiniteScroller";
import type { State } from "../reducers";
import type { Dispatch } from "../action/types";
import type { Node, ComponentType } from "react";

/* Props required to connect to the state */
type ConnectProps = {
  lang: string,
  query: string,
  itemHeight: number
};

/* Props expected */
type IncomingProps = ConnectProps & {
  render: (props: Object) => Node
};

const mapStateToProps = (state: State, { lang, query }: ConnectProps) => {
  const searchId = makeSearchId(lang, query);

  return {
    data: getArticles(state, searchId),
    error: getError(state, searchId),
    hasMore: hasMoreThumbnails(state, searchId),
    isLoadingMore: isFetchingThumbnails(state, searchId)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { lang, query }: ConnectProps
) => ({
  load: () => dispatch(requestSearch(lang, query)),
  loadMore: () =>
    dispatch(requestMoreThumbnails(lang, makeSearchId(lang, query)))
});

const connectOptions = {
  areStatesEqual: (next: State, prev: State) =>
    next.searches === prev.searches && next.thumbnails === prev.thumbnails,
  areOwnPropsEqual: (next: ConnectProps, prev: ConnectProps) =>
    next.lang === prev.lang &&
    next.query === prev.query &&
    next.itemHeight === prev.itemHeight
};

/* cast in order to make IncomingProps required */
export default (connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  connectOptions
)(InfiniteScroller): ComponentType<IncomingProps>);
