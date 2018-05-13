import * as fn from "./query";
import { openSearch, thumbnails } from "../__mocks__/api";
import { ids, articles, lang, query } from "../__mocks__/reducers";

describe("src/util/query", () => {
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
