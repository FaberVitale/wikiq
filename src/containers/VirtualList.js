//@flow
import * as React from "react";
import { warn, isNaN } from "../util/functions";

type Props = {
  renderListItem: (props: {}, item: mixed, index: number) => React.Node,
  itemHeight: number,
  scrollY: number,
  viewportHeight: number,
  buffer: number,
  data: Array<mixed>
};

const styles = {
  itemBase: {
    position: "absolute",
    width: "100%",
    left: 0
  }
};

const renderList = (
  from: number,
  to: number,
  { itemHeight, scrollY, data, renderListItem, viewportHeight, ...rest }: Props
) => {
  let list = [];

  for (let i = from; i < to; i++) {
    const style = {
      ...styles.itemBase,
      top: i * itemHeight,
      height: itemHeight
    };

    list.push(
      <div style={style} key={i}>
        {renderListItem(rest, data[i], i)}
      </div>
    );
  }

  return list;
};

const makeErrorMessage = (propName: string, val: number) =>
  `${propName} should be a number >= 0, got ${val}.\nFallback to default value`;

class VirtualList extends React.PureComponent<Props> {
  static defaultProps = {
    buffer: 10,
    itemHeight: 50
  };

  render() {
    const { viewportHeight, scrollY, data } = this.props;

    let buffer, itemHeight;

    if (this.props.buffer < 0 || isNaN(this.props.buffer)) {
      warn(makeErrorMessage("buffer", this.props.buffer));
      buffer = VirtualList.defaultProps.buffer;
    } else {
      buffer = this.props.buffer;
    }

    if (this.props.itemHeight < 0 || isNaN(this.props.itemHeight)) {
      warn(makeErrorMessage("itemHeight", this.props.itemHeight));
      itemHeight = VirtualList.defaultProps.itemHeight;
    } else {
      itemHeight = this.props.itemHeight;
    }

    /* it renders Math.min(len, Math.ceil(viewportHeight / itemHeight))
     * elements */
    const len = data.length;
    const from = Math.max(0, Math.floor(scrollY / itemHeight) - buffer);
    const to = Math.min(
      len,
      Math.ceil(viewportHeight / itemHeight) + from + buffer
    );

    const containerStyle = {
      position: "relative",
      height: len * itemHeight
    };

    return <div style={containerStyle}>{renderList(from, to, this.props)}</div>;
  }
}

export default VirtualList;
