//@flow
import React from "react";

type Props = {
  rel: string,
  target: string,
  href: string,
  label: string
};

/* Component that renders an external link that onClick opens up a new page/tab */
class ExtLink extends React.Component<Props> {
  static defaultProps = {
    rel: "noreferrer noopener",
    target: "_blank",
    href: "#",
    label: "external link"
  };

  render() {
    const { label, ...rest } = this.props;

    return React.createElement("a", rest, label);
  }
}

export default ExtLink;
