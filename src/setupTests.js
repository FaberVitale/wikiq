import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// we hide console.warn calls that are in development code
if (typeof window !== "undefined" && window.console != null) {
  window.console.warn = () => {};
}
