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
});
