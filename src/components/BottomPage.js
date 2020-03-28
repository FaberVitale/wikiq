//@flow
import * as React from "react";
import { BOTTOM_PAGE_HEIGHT, BOTTOM_PAGE_MARGIN_TOP } from "../config";

type Props = {
  children: React.Node,
};

/* Component Placed after the infinite scroll section  */
class BottomPage extends React.Component<Props> {
  static styles = {
    container: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: BOTTOM_PAGE_HEIGHT,
      height: BOTTOM_PAGE_MARGIN_TOP, // <-- !important, it has fixed height
      overflow: "auto",
    },
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <aside style={BottomPage.styles.container}>{this.props.children}</aside>
    );
  }
}

export default BottomPage;
