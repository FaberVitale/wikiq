//@flow
import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { getPDFLink, slugify, getGoogleSearchLink } from "../util/query";
import { CARD_SIDE, CARD_MARGIN } from "../config";
import type { WikiArticle } from "../reducers";
import OverflowFade from "./OverflowFade";
import ExtLink from "./ExtLink";

/* optimization: instad of calling withStyles N times HOC,
 *  we export it in order to inject props.classes through
 * the Component that renders ArticleCard */
export const classes = withStyles(theme => ({
  card: {
    height: CARD_SIDE,
    minWidth: CARD_SIDE,
    display: "flex",
    justifyContent: "space-around",
    marginBottom: CARD_MARGIN,
    overflow: "hidden",
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 2
  },
  content: {
    flex: 1,
    height: "100%",
    padding: 8
  },
  title: {
    marginBottom: CARD_MARGIN >>> 1
  },
  heading: {
    "*:focus > &": {
      color: theme.palette.background.paper
    }
  },
  cardActions: {
    height: "10%",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: "0 16px"
  },
  cardMedia: {
    minHeight: CARD_SIDE,
    minWidth: 100,
    width: 280,
    backgroundPosition: "50% 0%",
    backgroundSize: "cover",
    //some thumbnail has trasparency and was meant to be displayed on a white
    //background (wikipedia standard page)
    backgroundColor: "#ffffff",
    transform: "translate3d(0, 0, 0)"
  },
  text: {
    height: "90%",
    padding: 16,
    overflow: "hidden",
    position: "relative" // required to use OverflowFade correctly
  },
  link: {
    display: "inline-block",
    padding: "4px",
    borderRadius: 4,
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    textDecoration: "none",
    outline: "none",
    "&:focus": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper
    }
  },
  bottomLink: {
    fontSize: 14
  }
}));

type Props = {
  lang: string,
  article: WikiArticle,
  classes: MUIClasses
};

type State = {
  lang: string,
  title: string,
  googleLink: string,
  pdfLink: string
};

// text of the ext links
const labels = {
  page: "Link",
  pdf: "Pdf",
  google: "Google"
};

const getDerivedState: (props: Props) => State = ({ article, lang }) => ({
  lang,
  title: article.info.title,
  pdfLink: getPDFLink(lang, slugify(article.info.title)),
  googleLink: getGoogleSearchLink(article.info.title)
});

class ArticleCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // cache links generated from props
    this.state = getDerivedState(props);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (
      nextProps.article.info.title !== prevState.title ||
      nextProps.lang !== prevState.lang
    ) {
      return getDerivedState(nextProps);
    }

    return null;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const hasStyleChanged = nextProps.classes.card !== this.props.classes.card;

    const hasQueryChanged =
      nextProps.article.info.title !== this.props.article.info.title;

    return hasStyleChanged || hasQueryChanged;
  }

  render() {
    const { article, classes } = this.props;
    const { thumbnail, info } = article;
    const { pdfLink, googleLink } = this.state;

    const titleLink = `${classes.title} ${classes.link}`;
    const bottomLink = `${classes.link} ${classes.bottomLink}`;

    return (
      <section className={classes.card}>
        <div className={classes.content}>
          <div className={classes.text}>
            <OverflowFade />
            <ExtLink className={titleLink} href={info.link}>
              <Typography
                variant="title"
                className={classes.heading}
                color="secondary"
                component="h3"
              >
                {article.info.title}
              </Typography>
            </ExtLink>
            <Typography variant="body2" color="textSecondary" component="p">
              {article.info.description}
            </Typography>
          </div>
          <div className={classes.cardActions}>
            <ExtLink className={bottomLink} href={pdfLink}>
              {labels.pdf}
            </ExtLink>
            <ExtLink className={bottomLink} href={googleLink}>
              {labels.google}
            </ExtLink>
          </div>
        </div>
        {thumbnail && (
          <CardMedia
            className={classes.cardMedia}
            image={thumbnail.source}
            title={article.info.title}
          />
        )}
      </section>
    );
  }
}

export default ArticleCard;
