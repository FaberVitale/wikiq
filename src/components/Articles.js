//@flow
import React from "react";
import ArticleCard, { classes } from "./ArticleCard";
import type { WikiArticle } from "../reducers";

type Props = {
  articles: Array<WikiArticle>,
  lang: string,
  query: string,
  itemHeight: number,
  scrollY: number,
  classes: MUIClasses,
  viewportHeight: number
};

class Articles extends React.Component<Props> {
  shouldComponentUpdate({
    viewportHeight,
    scrollY,
    lang,
    query,
    articles,
    classes
  }: Props) {
    const hasQueryChanged =
      this.props.lang !== lang || this.props.query !== query;

    const hasMoreItems = this.props.articles.length !== articles.length;

    const deltaScrollY = scrollY - this.props.scrollY;

    const deltaViewportHeight = viewportHeight - this.props.viewportHeight;

    const hasStyleChanged = classes.card !== this.props.classes.card;

    return (
      hasQueryChanged ||
      hasMoreItems ||
      hasStyleChanged ||
      deltaViewportHeight !== 0 ||
      deltaScrollY !== 0
    );
  }

  static makeList = (from: number, to: number, props: Props) => {
    let list = [];

    const { articles, lang } = props;

    for (let i = from; i < to; i++) {
      let article = articles[i];

      list.push(
        <ArticleCard
          article={article}
          classes={props.classes}
          lang={lang}
          key={article.info.title}
        />
      );
    }

    return list;
  };

  render() {
    const { articles, viewportHeight, scrollY } = this.props;
    const itemHeight = 296;
    const len = articles.length;
    const buffer = 4;

    const from = Math.max(0, Math.floor(scrollY / itemHeight) - buffer);
    const to = Math.min(
      len,
      Math.ceil((viewportHeight + scrollY) / itemHeight + buffer)
    );

    const containerStyle = {
      height: len * itemHeight
    };

    const contentStyle = {
      willChange: "transform",
      transform: `translateY(${from * itemHeight}px)`
    };

    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          {Articles.makeList(from, to, this.props)}
        </div>
      </div>
    );
  }
}

export default classes(Articles);
