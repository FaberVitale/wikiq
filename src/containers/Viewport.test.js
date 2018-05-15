import { ViewportProvider, withViewport } from "./Viewport";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import React from "react";

describe("src/containers/Scroll", () => {
  let wrapper;
  let LogProps = props => {
    return JSON.stringify(props);
  };

  let LogPropsWrapped = withViewport(LogProps);

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

  describe("withViewport", () => {
    //enzyme hasn't updated yet, see:https://github.com/airbnb/enzyme/issues/1509
    it("injects defaultViewport values if does not have ViewportProvider as anchestor", () => {
      const tree = renderer.create(<LogPropsWrapped />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
