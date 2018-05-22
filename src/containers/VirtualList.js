//@flow
import * as React from "react";

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

class VirtualList extends React.PureComponent<Props> {
  static defaultProps = {
    buffer: 10
  };

  render() {
    const { viewportHeight, scrollY, itemHeight, data, buffer } = this.props;
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
