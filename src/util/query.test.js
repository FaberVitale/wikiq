import * as fn from "./query";
import { openSearch, thumbnails } from "../__mocks__/api";
import { ids, articles, lang, query } from "../__mocks__/reducers";

describe("src/util/query", () => {
  const plus3 = "+++";
  const spaceSequence = "\u0020\u0020\u0020";
  const testString = "asg12AR#@~`\u0020/\\+()_:.,?'^💩|&\"";

  test("encodeComponent", () => {
    expect(fn.encodeComponent(spaceSequence)).toBe(plus3);
    expect(
      decodeURIComponent(fn.encodeComponent(testString).replace(/\+/g, "%20"))
    ).toBe(testString);
  });

  test("decodeComponent", () => {
    expect(fn.decodeComponent(plus3)).toBe(spaceSequence);
    expect(
      fn.decodeComponent(encodeURIComponent(testString).replace(/%20/g, "%20"))
    ).toBe(testString);
  });

  test("slugify", () => {
    expect(fn.slugify(spaceSequence)).toBe("___");
    expect(
      decodeURIComponent(fn.slugify(testString).replace(/_/g, "%20"))
    ).toBe(testString.replace(/_/g, "\u0020"));
  });

  test("deslugify", () => {
    expect(fn.deslugify("___")).toBe(spaceSequence);
    expect(
      fn.deslugify(encodeURIComponent(testString).replace(/%20/g, "_"))
    ).toBe(testString.replace(/_/g, "\u0020"));
  });

  test("getOpenSearchURL", () => {
    expect(fn.getOpenSearchURL(lang, query)).toMatchSnapshot();
    expect(fn.getOpenSearchURL(lang, query, 30)).toMatchSnapshot();
  });

  test("getThumbnailURL", () => {
    const titles = ["as", "rem", "tik", "tak"];
    expect(fn.getThumbnailURL(lang, titles)).toMatchSnapshot();
    expect(fn.getThumbnailURL(lang, titles, 300)).toMatchSnapshot();
  });

  test("getPDFLink", () => {
    expect(fn.getPDFLink(lang, "stan")).toMatchSnapshot();
    expect(fn.getPDFLink(lang, "sting")).toMatchSnapshot();
  });

  test("transformSearch", () => {
    expect(fn.transformSearch(lang, openSearch)).toEqual({
      ids,
      articles: ids.map(id => articles[id])
    });
  });

  test("extractThumbnails", () => {
    const result = fn.extractThumbnails(lang, thumbnails.query.pages);
    const keys = Object.keys(result);

    expect(keys).not.toHaveLength(0);
    expect(
      keys.every(
        key =>
          Object.prototype.hasOwnProperty.call(result[key], "source") &&
          Object.prototype.hasOwnProperty.call(result[key], "width") &&
          Object.prototype.hasOwnProperty.call(result[key], "height")
      )
    ).toBe(true);
  });
});
