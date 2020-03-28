import React from "react";
import SearchForm, { BaseComponent } from "./SearchForm";
import withMemoryRouter from "../__mocks__/withMemoryRouter";
import { createMount } from "@material-ui/core/test-utils";
import { withRouter } from "react-router-dom";
describe("src/containers/SearchForm", () => {
  let wrapper;
  const mount = createMount();
  const submit = jest.fn();
  let viewProps = [];
  const testString = "test-string";

  const makeEvent = (value = "") => ({
    bubbles: true,
    cancellable: false,
    target: {
      value,
    },
  });

  const view = jest.fn((props) => {
    // grab handlers and state passsed
    viewProps.push(props);

    return JSON.stringify(props.state);
  });

  beforeEach(() => {
    wrapper = mount(<BaseComponent view={view} submit={submit} />);
  });

  afterEach(() => {
    submit.mockClear();
    view.mockClear();
    viewProps = [];
    wrapper.unmount();
  });

  it("updates the state on input chage", () => {
    viewProps[0].handlers.inputChange(makeEvent(testString));

    expect(viewProps[viewProps.length - 1].state.input).not.toBe(
      viewProps[0].state.input
    );
    expect(viewProps[viewProps.length - 1].state.input).toBe(testString);
  });

  it("update the state on select change", () => {
    const nextIndex = "2";
    viewProps[0].handlers.selectChange(makeEvent(nextIndex));

    expect(viewProps[viewProps.length - 1].state.index).not.toBe(
      viewProps[0].state.index
    );
    expect(viewProps[viewProps.length - 1].state.index).toBe(
      parseInt(nextIndex, 10)
    );
  });

  it("clears the input if inputClear is Called", () => {
    viewProps[0].handlers.inputChange(makeEvent(testString));

    expect(viewProps[viewProps.length - 1].state.input).toBe(testString);

    viewProps[viewProps.length - 1].handlers.clear();

    expect(viewProps[viewProps.length - 1].state.input).toBe("");
  });

  it('invokes submit if handlers.submit is called and input !== ""', () => {
    viewProps[0].handlers.submit();

    expect(submit.mock.calls.length).toBe(0);

    viewProps[0].handlers.inputChange(makeEvent(testString));

    viewProps[viewProps.length - 1].handlers.submit();
    expect(submit.mock.calls.length).toBe(1);
  });

  it("pushes a new route on the history stack if submit is invoked", () => {
    const initRoute = "/";
    let route = initRoute;
    let handlers = {};
    const ListenRoute = withRouter((props) => {
      route = props.location.pathname;
      return null;
    });

    const WrapRouter = withMemoryRouter(() => {
      return (
        <div>
          <ListenRoute />
          <SearchForm
            view={(props) => {
              handlers = props.handlers;
              return null;
            }}
          />
        </div>
      );
    })([initRoute]);

    mount(<WrapRouter />);

    handlers.inputChange(makeEvent(testString));
    handlers.submit();
    expect(route).not.toBe(initRoute);
  });
});
