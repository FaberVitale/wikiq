import ArticleCard from "./ArticleCard";
import { createMount } from "material-ui/test-utils";
import { articles, lang, thumbnails } from "../__mocks__/reducers";
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
    const ids = {
      vertical: "en/Remittance",
      horizontal: "en/Remy Ma",
      noThumbnail: "en/Remix"
    };

    const props = {
      vertical: {
        lang,
        article: {
          info: articles[ids.vertical],
          thumbnail: thumbnails[ids.vertical]
        }
      },
      horizontal: {
        lang,
        article: {
          info: articles[ids.horizontal],
          thumbnail: thumbnails[ids.horizontal]
        }
      },
      noThumbnail: {
        lang,
        article: {
          info: articles[ids.noThumbnail],
          thumbnail: thumbnails[ids.noThumbnail]
        }
      }
    };

    mount(
      <div>
        {Object.keys(props).map(id => <ArticleCard {...props[id]} key={id} />)}
      </div>
    );
  });
});
