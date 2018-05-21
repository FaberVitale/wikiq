import React from "react";
import OverflowFade from "./OverflowFade";
import ReactDOM from "react-dom";
import { createShallow } from "@material-ui/core/test-utils";

describe("src/components/OverflowFade", () => {
  const shallow = createShallow();
  let wrapper;

  it("renders without crashing", done => {
    const div = document.createElement("div");

    const cleanUp = (div, done) => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    };

    ReactDOM.render(<OverflowFade />, div, cleanUp(div, done));
  });

  it("applies style and undocumented props to the root element", () => {
    const style = { color: "green" };
    wrapper = shallow(<OverflowFade tabIndex={0} style={style} />);

    const jqObj = wrapper.render();
    expect(jqObj.css("color")).toBe(style.color);
    expect(jqObj.attr("tabindex")).toBe("0");
  });

  it("concatenates className if provided", () => {
    const className = "__CLASS__";

    wrapper = shallow(<OverflowFade className={className} />);

    const jqObj = wrapper.render();

    const renderedClass = jqObj.attr("class");

    expect(renderedClass).toMatch(new RegExp("\\.*\\u0020" + className + "$"));
  });
});
