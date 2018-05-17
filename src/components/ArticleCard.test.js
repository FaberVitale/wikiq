import ArticleCard from "./ArticleCard";
import { createMount } from "@material-ui/core/test-utils";
import { articles, thumbnails, ids, lang } from "../__mocks__/reducers";
import React from "react";

describe("src/components/ArticleCard", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("renders without crashing", () => {
    const props = ids.map(id => ({
      info: articles[id],
      thumbnail: thumbnails[id]
    }));

    mount(
      <div>
        {props.map((id, index) => (
          <ArticleCard lang={lang} article={props[index]} key={ids[index]} />
        ))}
      </div>
    );
  });
});
