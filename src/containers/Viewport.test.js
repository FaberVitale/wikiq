import { ViewportProvider, ViewportConsumer, bitmask } from "./Viewport";
import { shallow } from "enzyme";
import React from "react";

describe("src/containers/Scroll", () => {
  let wrapper;

  let LogProps = (mask = bitmask.ALL) => (props) => {
    return (
      <ViewportConsumer unstable_observedBits={mask}>
        {(context) => JSON.stringify(context)}
      </ViewportConsumer>
    );
  };
  describe("ViewportProvider", () => {
    it("renders the children if passed", () => {
      wrapper = shallow(
        <ViewportProvider>
          <LogProps />
        </ViewportProvider>
      );

      let children = wrapper.children();

      expect(children).toHaveLength(1);

      expect(children.matchesElement(<LogProps />)).toBe(true);
    });

    it("renders nothing, if it has no children", () => {
      wrapper = shallow(<ViewportProvider />);

      expect(wrapper.html()).toBe("");
    });
  });
});
