//@flow
import * as React from "react";
import { warn, isNaN } from "../util/functions";

type Props = {
  renderListItem: (props: {}, item: mixed, index: number) => React.Node,
  itemHeight: number,
  scrollY: number,
  viewportHeight: number,
  offsetTop: number,
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
  {
    buffer,
    itemHeight,
    scrollY,
    data,
    renderListItem,
    viewportHeight,
    ...rest
  }: Props
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
    itemHeight: 50,
    offsetTop: 0
  };

  rootRef = React.createRef();

  render() {
    const { viewportHeight, scrollY, data } = this.props;

    let buffer, itemHeight, offsetTop;

    if (this.props.offsetTop < 0 || isNaN(this.props.offsetTop)) {
      warn(makeErrorMessage("offsetTop", this.props.offsetTop));
      offsetTop = VirtualList.defaultProps.offsetTop;
    } else {
      offsetTop = this.props.offsetTop;
    }

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

    const len = data.length;
    /* half rounded down is displayed below and 
     * half rounded up is displayed below
     * 
     * it renders Math.min(len, inView + buffer)
     * 
     * if from is 0 below === buffer, above = 0
     * if to is len above === buffer, below = 0
     */
    let above = Math.floor(buffer / 2);

    const inView = Math.ceil(viewportHeight / itemHeight);

    let from = Math.max(
      0,
      Math.floor((scrollY - offsetTop) / itemHeight) - above
    );
    let to = Math.min(len, inView + from + buffer);

    if (to === len) {
      from = Math.max(0, to - inView - buffer);
    }

    const containerStyle = {
      position: "relative",
      height: len * itemHeight
    };

    return (
      <div ref={this.rootRef} style={containerStyle}>
        {renderList(from, to, this.props)}
      </div>
    );
  }
}

export default VirtualList;
