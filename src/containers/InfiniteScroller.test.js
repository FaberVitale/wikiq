import React from "react";
import { BaseComponent, default as InfiniteScroller } from "./InfiniteScroller";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";

describe("src/container/InfiniteScroller", () => {
  let wrapper;
  const logProps = jest.fn((props) => JSON.stringify(props));
  const load = jest.fn();
  const loadMore = jest.fn();

  const baseProps = {
    load,
    loadMore,
    data: null,
    error: null,
    isLoadingMore: false,
    hasMore: false,
    scrollY: 0,
    viewportHeight: 1080,
    render: logProps,
  };

  const props = {
    idle: baseProps,
    error: {
      ...baseProps,
      error: { message: "oops!" },
    },
  };

  afterEach(() => {
    logProps.mockClear();
    load.mockClear();
    loadMore.mockClear();
  });

  it("renders without crashing", (done) => {
    const { scrollY, viewportHeight, ...testRenderProps } = props.idle;
    const div = document.createElement("div");

    const cleanUp = () => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    };

    ReactDOM.render(
      <InfiniteScroller {...testRenderProps} render={() => null} />,
      div,
      cleanUp
    );
  });

  it("renders props.render(otherProps)", () => {
    wrapper = shallow(<BaseComponent {...props.idle} />);

    const { render, ...rest } = baseProps;

    expect(logProps.mock.calls).toHaveLength(1);
    expect(logProps.mock.calls[0]).toHaveLength(1);
    expect(logProps.mock.calls[0][0]).toEqual(rest);
  });

  it("invokes only load onDidMount, if data == null && error == null", () => {
    wrapper = shallow(<BaseComponent {...props.idle} />);

    expect(props.idle.load.mock.calls).toHaveLength(1);
    expect(props.idle.loadMore.mock.calls).toHaveLength(0);
  });

  it("invokes only load onDidUpdate if data == null && error == null", () => {
    wrapper = shallow(<BaseComponent {...props.error} />);

    expect(props.idle.load.mock.calls).toHaveLength(0);
    expect(props.idle.loadMore.mock.calls).toHaveLength(0);

    wrapper.setProps(props.idle); // <-- triggers lifecycles hooks

    expect(props.idle.load.mock.calls).toHaveLength(1);
    expect(props.idle.loadMore.mock.calls).toHaveLength(0);
  });
});
