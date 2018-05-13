import * as selector from "./index";
import { initState, search, searchId } from "../__mocks__/reducers";

describe("src/selectors", () => {
  test("getTheme", () => {
    expect(selector.getTheme(initState)).toBe("light");
  });

  test("getSearch", () => {
    expect(selector.getSearch(initState, "")).toBeNull();
    expect(selector.getSearch(search.fetching, searchId)).toBe(
      search.fetching.searches[searchId]
    );
  });

  test("getError", () => {
    expect(selector.getError(initState, "")).toBeNull();
    expect(selector.getError(search.fetching)).toBeNull();
    expect(selector.getError(search.fetchError, searchId)).toBe(
      search.fetchError.searches[searchId].error
    );
  });

  test("hasMoreThumbnails", () => {
    expect(selector.hasMoreThumbnails(initState, "")).toBe(false);
    expect(selector.hasMoreThumbnails(search.fetched, searchId)).toBe(true);
    expect(
      selector.hasMoreThumbnails(search.fetchedAllThumbnails, searchId)
    ).toBe(false);
  });
  test("shouldFetchSearch", () => {
    expect(selector.shouldFetchSearch(initState, "")).toBe(true);
    expect(selector.shouldFetchSearch(search.fetchError)).toBe(true);
    expect(selector.shouldFetchSearch(search.fetched, searchId)).toBe(false);
    expect(
      selector.shouldFetchSearch(search.fetchedAllThumbnails, searchId)
    ).toBe(false);
    expect(selector.shouldFetchSearch(search.fetching, searchId)).toBe(false);
  });

  test("isFetchingThumbnails", () => {
    expect(selector.isFetchingThumbnails(initState, "")).toBe(false);
    expect(selector.isFetchingThumbnails(search.fetching, searchId)).toBe(
      false
    );
    expect(selector.isFetchingThumbnails(search.fetchError, searchId)).toBe(
      false
    );
    expect(
      selector.isFetchingThumbnails(search.fetchedAllThumbnails, searchId)
    ).toBe(false);
    expect(selector.isFetchingThumbnails(search.fetched, searchId)).toBe(false);
    expect(
      selector.isFetchingThumbnails(search.fetchingThumbnails, searchId)
    ).toBe(true);
  });

  test("getArticles", () => {
    expect(selector.getArticles(initState, "")).toBeNull();
    expect(selector.getArticles(initState, searchId)).toBeNull();
    expect(selector.getArticles(search.fetching, searchId)).toBeNull();
    expect(selector.getArticles(search.fetched, searchId)).toMatchSnapshot();
  });
});
