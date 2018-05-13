//@flow
import * as React from "react";
import { withScrollListener } from "../containers/ScrollListener";
import { $html } from "../util/dom";
import { INFINITE_SCROLL_THRESHOLD } from "../config";

type InfiniteScrollerPassThroughProps = {
  data: ?Array<*>,
  error: mixed,
  load: () => void,
  loadMore: () => void,
  isLoadingMore: boolean,
  hasMore: boolean,
  pageYOffset: number,
  innerHeight: number
};

type InfiniteScrollerInternalProps = {
  subscribed: boolean,
  toggleSubscription: () => void,
  render: (props: Object) => React.Node
};

/* Component that request data in an infinite scrolling manner:
 *  it delegates the rendering to a render function passed as a prop
 *  Logic
 *  - if error != null -> an error has occurred, do not load data
 *  - if error == null && data != null data has been fetched
 *  - if error == null && data == null invokes load
 * 
 *  - if data has been fetched and !isLoadingMore and hasMore
 *    and if the section of the page below the viewport is lower than 
 *    INFINITE_SCROLL_THRESHOLD, invokes loadMore
 */
class InfiniteScroller extends React.Component<
  InfiniteScrollerInternalProps & InfiniteScrollerPassThroughProps
> {
  loadIfNecessary = () => {
    const {
      data,
      error,
      hasMore,
      isLoadingMore,
      pageYOffset,
      innerHeight,
      load
    } = this.props;

    const shouldLoadSearch = data == null && error == null;
    const isAllowedToLoadMore = hasMore && !isLoadingMore;

    if (shouldLoadSearch) {
      load();
    } else if (isAllowedToLoadMore) {
      const scrollHeight = $html ? $html.scrollHeight : -1;

      const isInInfiniteScrollRange =
        scrollHeight > -1 &&
        pageYOffset + innerHeight > scrollHeight - INFINITE_SCROLL_THRESHOLD;

      const isBodyLargerThanView = scrollHeight > innerHeight;

      if (isBodyLargerThanView && isInInfiniteScrollRange) {
        this.props.loadMore();
      }
    }
  };

  componentDidMount() {
    this.loadIfNecessary();
  }

  componentDidUpdate() {
    this.loadIfNecessary();
  }

  render() {
    const { render, toggleSubscription, subscribed, ...rest } = this.props;

    return render(rest);
  }
}

export default withScrollListener(InfiniteScroller);
