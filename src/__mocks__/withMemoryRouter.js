import React from "react";
import MemoryRouter from "react-router-dom/MemoryRouter";

export default (Comp) => (initialEntries = ["/"], initialIndex = 0) => {
  class MockRoute extends React.Component {
    static displayName = `withMockRoute(${
      Comp.displayName || Comp.name || "Component"
    })`;

    render() {
      return (
        <MemoryRouter
          initialEntries={initialEntries}
          initialIndex={initialIndex}
        >
          <Comp {...this.props} />
        </MemoryRouter>
      );
    }
  }
  return MockRoute;
};
