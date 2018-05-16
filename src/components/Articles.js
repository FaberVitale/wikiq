//@flow
import React from "react";
import ArticleCard from "./ArticleCard";
import { PAGINATION_SIZE } from "../config";
import Fade from "@material-ui/core/Fade";
import type { WikiArticle } from "../reducers";

type Props = {
  articles: Array<WikiArticle>,
  lang: string,
  query: string
};

/* it renders PAGINATION_SIZE or less ArticleCard components 
 * it exists as a way to prevent re-renders of ArticlesCards
 * already mounted when props.articles changes.
 */
class ArticleGroup extends React.Component<
  Props & { from: number, to: number }
> {
  /* prevent components updates if lang or query do not change. */
  shouldComponentUpdate({ lang, query }: Props) {
    return this.props.lang !== lang || this.props.query !== query;
  }

  render() {
    const { from, to, articles, lang } = this.props;
    const cards = [];

    for (let i = from; i < to; i++) {
      const article = articles[i];

      cards.push(
        <ArticleCard key={article.info.title} lang={lang} article={article} />
      );
    }

    return cards;
  }
}

class Articles extends React.Component<Props> {
  static styles = {
    transition: {
      transitionDelay: 400
    },
    container: {
      width: "100%",
      padding: 0,
      // firefox complains about exessive memory usage caused by
      // this rule (MUI sets it to opacity)
      // see: https://bugzilla.mozilla.org/show_bug.cgi?id=1457106
      // and https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
      // according to the above article "will-change" set to opacity
      // implies that this element is going to change opacity often
      // which isnt the case in this situation,
      // because it transitions (fades in) once
      // during its lifecycle.
      willChange: "auto"
    }
  };

  shouldComponentUpdate({ articles, lang, query }: Props) {
    return (
      this.props.articles.length !== articles.length ||
      this.props.lang !== lang ||
      query !== this.props.query
    );
  }

  render() {
    const groups = [];

    for (
      let i = 0, len = this.props.articles.length;
      i < len;
      i += PAGINATION_SIZE
    ) {
      let to = i + PAGINATION_SIZE;

      //creates a new component and unmounts the prev one if lang or query changes
      const key = `${this.props.lang}-${this.props.query}-${i}`;

      groups.push(
        <ArticleGroup
          {...this.props}
          key={key}
          from={i}
          to={to > len ? len : to}
        />
      );
    }

    return (
      <Fade timeout={400} in={true} style={Articles.styles.transition}>
        <div style={Articles.styles.container}>{groups}</div>
      </Fade>
    );
  }
}

export default Articles;
