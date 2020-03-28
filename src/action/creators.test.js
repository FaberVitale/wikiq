import * as creators from "./creators";
import * as actions from "../fixtures/actions";
import { ids, thumbnails, articles } from "../fixtures/reducers";

describe("src/action/creators", () => {
  test("simple action creators", () => {
    const data = { articles: {}, ids: [], thumbnails: {} };

    expect(creators.changeTheme()).toEqual(actions.changeTheme);

    expect(creators.fetchSearch(actions.searchId)).toEqual(actions.fetchSearch);

    expect(creators.fetchThumbnails(actions.searchId)).toEqual(
      actions.fetchThumbnails
    );

    expect(
      creators.storeSearch(actions.lang, actions.searchId, {
        ids,
        thumbnails,
        articles,
      })
    ).toEqual(actions.storeSearch);

    expect(
      creators.failedToFetchSearch(actions.searchId, actions.error)
    ).toEqual(actions.failedToFetch);

    expect(creators.failedToFetchThumbnails(actions.searchId)).toEqual(
      actions.failedToFetchThumbnails
    );

    expect(creators.storeThumbnails(actions.searchId, data.thumbnails)).toEqual(
      {
        ...actions.storeThumbnails,
        thumbnails: data.thumbnails,
      }
    );
  });

  describe("thunks", () => {});
});
