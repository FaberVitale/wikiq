import * as fn from "./functions";

describe("src/functions", () => {
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
