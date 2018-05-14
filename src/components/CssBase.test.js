import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import CssBase from "./CssBase";

describe("components/CssBase", () => {
  const shallow = createShallow({ dive: true });

  let wrapper = shallow(<CssBase />);

  it("renders nothing", () => {
    expect(wrapper.children()).toHaveLength(0);
  });
});
