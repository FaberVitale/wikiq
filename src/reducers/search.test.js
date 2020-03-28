import * as reducers from "./search";
import { initState, search, initSearch } from "../fixtures/reducers";
import * as actions from "../fixtures/actions";
import * as actionTypes from "../action/types";
import { PAGINATION_SIZE } from "../config";

describe("src/reducers/search", () => {
  describe("thumbnails", () => {
    it("provides the initial state", () => {
      expect(reducers.thumbnails(undefined, {})).toEqual(initState.thumbnails);
    });

    it("returns the initial state if an unknown actionType is provided", () => {
      expect(reducers.thumbnails(initState.thumbnails, actions.unknown)).toBe(
        initState.thumbnails
      );
    });

    it("stores thumbnails if STORE_SEARCH or STORE_THUMBNAILS are passed", () => {
      const action = {
        type: actionTypes.STORE_SEARCH,
        thumbnails: search.fetched.thumbnails,
      };

      expect(reducers.thumbnails(initState.thumbnails, action)).toEqual(
        action.thumbnails
      );

      expect(
        reducers.thumbnails(initState.thumbnails, {
          ...action,
          type: actionTypes.STORE_THUMBNAILS,
        })
      ).toEqual(action.thumbnails);
    });

    describe("articles", () => {
      it("provides the initial state", () => {
        expect(reducers.articles(undefined, {})).toEqual(initState.articles);
      });

      it("returns the initial state if an unknown actionType is provided", () => {
        expect(reducers.articles(initState.articles, actions.unknown)).toBe(
          initState.articles
        );
      });

      it("adds articles if a STORE_SEARCH action is provided", () => {
        const expected = search.fetched.articles;

        const ids = search.fetched.searches["en/rem"].ids;
        const articlesArray = ids.map((id) => expected[id]);
        const action = {
          type: actionTypes.STORE_SEARCH,
          ids,
          articles: articlesArray,
        };

        expect(reducers.articles(initState.articles, action)).toEqual(expected);
      });
    });
    describe("searches", () => {
      it("provides the initial state", () => {
        expect(reducers.searches(undefined, {})).toEqual(initState.searches);
      });

      it("returns the initial state if an unknown actionType is provided", () => {
        expect(reducers.articles(initState.searches, actions.unknown)).toBe(
          initState.searches
        );
      });
    });

    describe("search", () => {
      it("provides the initial state", () => {
        expect(reducers.search(undefined, {})).toEqual(initSearch);
      });

      it("returns the initial state if an unknown actionType is provided", () => {
        expect(reducers.search(initSearch, actions.unknown)).toBe(initSearch);
      });

      it("sets state to fetching if FETCH_STATE action is passed", () => {
        const expected = {
          ...initSearch,
          fetchState: reducers.fetchStates.REQUESTED_SEARCH,
        };

        expect(reducers.search(undefined, actions.fetchSearch)).toEqual(
          expected
        );

        expect(reducers.search(initSearch, actions.fetchSearch)).toEqual(
          expected
        );
      });

      it("stores the ids if STORE_SEARCH is passed", () => {
        expect(
          reducers.search(initSearch, actions.storeSearch).ids
        ).toBeInstanceOf([].constructor);
      });

      it("sets state to failed to fetch if FAILED_TO_FETCH is passed", () => {
        const expected = {
          ...initSearch,
          fetchState: reducers.fetchStates.IDLE,
          error: actions.error.message,
        };

        expect(reducers.search(undefined, actions.failedToFetch)).toEqual(
          expected
        );

        expect(
          reducers.search(
            reducers.search(undefined, actions.fetchSearch),
            actions.failedToFetch
          )
        ).toEqual(expected);
      });
      it("updates the state if STORE_THUMBNAILS or FAILED_TO_FETCHTHUMBNAILS are passed", () => {
        const expected = {
          ...initSearch,
          fetchState: reducers.fetchStates.IDLE,
          thumbnails: initSearch.thumbnails + PAGINATION_SIZE,
        };

        expect(
          reducers.search(undefined, actions.failedToFetchThumbnails)
        ).toEqual(expected);
        expect(reducers.search(undefined, actions.storeThumbnails)).toEqual(
          expected
        );
      });
      it("sets the state to requested thumbnails if FETCH_THUMBNAILS action is passed", () => {
        const expected = {
          ...initSearch,
          fetchState: reducers.fetchStates.REQUESTED_THUMBNAILS,
        };

        expect(reducers.search(undefined, actions.fetchThumbnails)).toEqual(
          expected
        );
      });
    });
  });
});
