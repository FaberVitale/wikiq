import BottomPage from "./BottomPage";
import { shallow } from "enzyme";
import { createElement as el } from "react";

describe("src/components/BottomPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(el(BottomPage, {}));
  });

  const child = el("p", { children: "a" });

  it("s children prop defaults to null", () => {
    expect(wrapper.children()).toHaveLength(0);
  });

  it("renders an aside element", () => {
    expect(wrapper.find("aside")).not.toBeNull();
  });

  it("renders children correctly", () => {
    wrapper.setProps({ children: child });
    expect(wrapper.children()).toHaveLength(1);

    expect(wrapper.childAt(0).matchesElement(child)).toBe(true);
  });
});
