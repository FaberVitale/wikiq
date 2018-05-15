import * as fn from "./functions";
import { compose } from "redux";

describe("src/functions", () => {
  describe("applyEllipsis(len: number, text: string)", () => {
    const emptyString = "";
    const singleChar = "a";

    const isEllipsed = str => str.slice(-3) === "...";

    const testEllipsis = compose(isEllipsed, fn.applyEllipsis);

    it("returns text if len is < 0 or <= text.length", () => {
      expect(fn.applyEllipsis(0, emptyString)).toBe(emptyString);
      expect(fn.applyEllipsis(2, singleChar)).toBe(singleChar);
      expect(testEllipsis(100, new Array(6).fill("\u0020").join(""))).toBe(
        false
      );
    });

    it("applies ellipsis at len, if string ends with an elllipsable char", () => {
      const testString = "as\u0020ert";
      const ellipsed = fn.applyEllipsis(3, testString);
      expect(ellipsed).toBe(testString.slice(0, 2) + "...");
    });
  });

  describe("computeChangedBitsFactory", () => {
    const props = ["a", "b"];

    let next, prev;
    const computeChangedBits = fn.computeChangedBitsFactory(props);
    it("returns a function", () => {
      expect(typeof computeChangedBits).toBe("function");
    });

    it("throws if the properties array has length greater than 31", () => {
      const throwIt = () => fn.computeChangedBitsFactory(new Array(32));
      expect(throwIt).toThrow();
    });

    it("computeChangedBits -> 0 if all the relevant props have the same value", () => {
      prev = { a: 2, b: 2 };
      next = { a: 2, b: 2 };

      expect(computeChangedBits(prev, prev)).toBe(0);
      expect(computeChangedBits(prev, next)).toBe(0);
    });

    it("computeChangedBits -> returns the bits that have changed", () => {
      prev = { a: 2, b: 2 };
      next = { a: 2, b: 3 };

      expect(computeChangedBits(prev, next)).toBe(2);

      next.a = 4;

      expect(computeChangedBits(prev, next)).toBe(3);

      next.b = 2;

      expect(computeChangedBits(prev, next)).toBe(1);
    });

    it("computeChangedBits -> doesnt take into account not relevant props", () => {
      prev = { a: 2, b: 2, c: 3 };
      next = { a: 2, b: 2 };

      expect(computeChangedBits(prev, next)).toBe(0);
    });
  });
});
