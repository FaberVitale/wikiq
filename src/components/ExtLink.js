//@flow
import * as React from "react";

type Props = {
  rel: string,
  target: string,
  href: string,
  children: React.Node
};

/* Component that renders an external link that onClick opens up a new page/tab */
class ExtLink extends React.Component<Props> {
  static defaultProps = {
    rel: "noreferrer noopener",
    target: "_blank",
    href: "#",
    children: "external link"
  };

  render() {
    const { children, ...rest } = this.props;

    return React.createElement("a", rest, children);
  }
}

export default ExtLink;
