import { createMount } from "material-ui/test-utils";
import { articles, lang, thumbnails, ids, query } from "../__mocks__/reducers";
import React from "react";
import Articles from "./Articles";

describe("src/components/Articles", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("renders without crashing", () => {
    const props = {
      lang,
      query,
      articles: ids.map(id => ({
        info: articles[id],
        thumbnail: thumbnails[id] || null
      }))
    };

    mount(<Articles {...props} />);
  });
});
