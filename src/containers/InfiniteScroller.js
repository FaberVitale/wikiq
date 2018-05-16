//@flow
import * as React from "react";
import { withScroll } from "./Scroll";
import { withViewport } from "./Viewport";
import { CARD_SIDE, CARD_MARGIN } from "../config";

const itemHeight = CARD_MARGIN + CARD_SIDE;

type InfiniteScrollerPassThroughProps = {
  itemHeight: number,
  data: ?Array<*>,
  error: mixed,
  load: () => void,
  loadMore: () => void,
  isLoadingMore: boolean,
  hasMore: boolean,
  scrollY: number,
  viewportHeight: number
};

type InfiniteScrollerInternalProps = {
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
 *    and if viewportHeight + the amount scrolled is >= 80% of the overall height
 *    of the items, call loadMore
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
      scrollY,
      viewportHeight,
      load,
      loadMore
    } = this.props;

    const shouldLoadSearch = data == null && error == null;
    const isAllowedToLoadMore = hasMore && !isLoadingMore;

    if (shouldLoadSearch) {
      load();
    } else if (data && isAllowedToLoadMore) {
      const hasScrolledEnough =
        scrollY > 0 &&
        scrollY + viewportHeight >= data.length * 0.8 * itemHeight;

      if (hasScrolledEnough) {
        loadMore();
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
    const { render, ...rest } = this.props;

    return render(rest);
  }
}

// for testing only
export const BaseComponent = InfiniteScroller;

export default withViewport(withScroll(InfiniteScroller));
