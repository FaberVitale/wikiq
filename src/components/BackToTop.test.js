import React from "react";
import ReactDOM from "react-dom";
import { createShallow } from "@material-ui/core/test-utils";
import BackToTop, { BaseComponent } from "./BackToTop";
import Button from "@material-ui/core/Button";
import { noop } from "../util/functions";

describe("src/components/BackToTop", () => {
  const propsFactory = (pageYOffset = 0, threshold = 0, scrollTo = noop) => ({
    pageYOffset,
    threshold,
    scrollTo
  });

  let shallow = createShallow();
  let wrapper;

  it("renders without crashing", done => {
    const div = document.createElement("div");
    const cleanUp = () => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    };
    ReactDOM.render(<BackToTop />, div, cleanUp);
  });

  it("renders a MUI button", () => {
    wrapper = shallow(<BaseComponent {...propsFactory()} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("is collapsed if pageYOffset is lower than the threshold", () => {
    const props = propsFactory(0, 1);

    wrapper = shallow(<BaseComponent {...props} />);

    const jqObj = wrapper.render();

    expect(/scale\(0\)\s*$/.test(jqObj.css("transform"))).toBe(true);

    expect(jqObj.attr("aria-hidden")).toBe("true");
  });

  it("is visible if  if pageYOffset is greater than threshold", () => {
    const props = propsFactory(5, 1);
    wrapper = shallow(<BaseComponent {...props} />);

    const jqObj = wrapper.render();

    expect(jqObj.attr("aria-hidden")).not.toBe("true");
  });

  it("has an a11y label", () => {
    wrapper = shallow(<BaseComponent {...propsFactory()} />)
      .find(Button)
      .dive();

    expect(wrapper.render().attr("aria-label")).toBeTruthy();
  });

  it("calls scrollTo(0,0) onClick", () => {
    const props = propsFactory(10, 0, jest.fn());

    wrapper = shallow(<BaseComponent {...props} />);

    wrapper.find(Button).simulate("click");
    expect(props.scrollTo.mock.calls).toHaveLength(1);
    expect(props.scrollTo.mock.calls[0]).toEqual([0, 0]);
  });
});
