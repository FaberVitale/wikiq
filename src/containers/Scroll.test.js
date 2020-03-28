import { ScrollProvider, ScrollConsumer, bitmask } from "./Scroll";
import { shallow } from "enzyme";

import React from "react";

describe("src/containers/Scroll", () => {
  let wrapper;
  let LogProps = (mask = bitmask.ALL) => (props) => {
    return (
      <ScrollConsumer unstable_observedBits={mask}>
        {(context) => JSON.stringify(context)}
      </ScrollConsumer>
    );
  };

  describe("ScrollProvider", () => {
    it("renders the children if passed", () => {
      wrapper = shallow(
        <ScrollProvider>
          <LogProps />
        </ScrollProvider>
      );

      let children = wrapper.children();

      expect(children).toHaveLength(1);

      expect(children.matchesElement(<LogProps />)).toBe(true);
    });

    it("renders nothing, if it has no children", () => {
      wrapper = shallow(<ScrollProvider />);

      expect(wrapper.html()).toBe("");
    });
  });
});
