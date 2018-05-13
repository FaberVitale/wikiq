//@flow
import * as React from "react";

type Props = {
  children: React.Node
};

/* Component Placed after the infinite scroll section  */
class BottomPage extends React.Component<Props> {
  static styles = {
    container: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      height: 50, // <-- !important, it has fixed height
      overflow: "auto"
    }
  };

  static defaultProps = {
    children: null
  };

  render() {
    return (
      <aside style={BottomPage.styles.container}>{this.props.children}</aside>
    );
  }
}

export default BottomPage;
