import { ScrollProvider, withScroll } from "./Scroll";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import React from "react";

describe("src/containers/Scroll", () => {
  let wrapper;
  let LogProps = props => {
    return JSON.stringify(props);
  };

  let LogPropsWrapped = withScroll(LogProps);

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

  describe("withScroll", () => {
    //enzyme hasn't updated yet, see:https://github.com/airbnb/enzyme/issues/1509
    it("injects defaultScroll values if does not have ScrollProvider as anchestor", () => {
      const tree = renderer.create(<LogPropsWrapped />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
