import ArticleCard, { classes } from "./ArticleCard";
import { createMount } from "@material-ui/core/test-utils";
import { articles, thumbnails, ids, lang } from "../fixtures/reducers";
import React from "react";

describe("src/components/ArticleCard", () => {
  let mount, Component;

  beforeAll(() => {
    mount = createMount();
    Component = classes(ArticleCard);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("renders without crashing", () => {
    const props = ids.map((id) => ({
      info: articles[id],
      thumbnail: thumbnails[id],
    }));

    mount(
      <div>
        {props.map((id, index) => (
          <Component lang={lang} article={props[index]} key={ids[index]} />
        ))}
      </div>
    );
  });
});
