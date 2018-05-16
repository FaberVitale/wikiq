//@flow
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { getPDFLink, slugify, getGoogleSearchLink } from "../util/query";
import { CARD_SIDE, CARD_MARGIN } from "../config";
import type { WikiArticle } from "../reducers";
import OverflowFade from "./OverflowFade";

const styles = {
  card: {
    height: CARD_SIDE,
    minWidth: CARD_SIDE,
    display: "flex",
    justifyContent: "space-around",
    marginBottom: CARD_MARGIN
  },
  content: {
    flex: 1,
    height: "100%",
    padding: 8
  },
  description: {
    fontSize: "16px"
  },
  title: {
    marginBottom: CARD_MARGIN >>> 1
  },
  cardActions: {
    height: "10%",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    width: "100%"
  },
  cardMedia: {
    minHeight: CARD_SIDE,
    minWidth: 100,
    width: 280,
    backgroundPosition: "50% 0%",
    backgroundSize: "cover",
    //some thumbnail has trasparency and was meant to be displayed on a white
    //background (wikipedia standard page)
    backgroundColor: "#ffffff"
  },
  text: {
    height: "90%",
    padding: 16,
    overflow: "hidden",
    position: "relative" // required to use OverflowFade correctly
  }
};

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

// Props for Card Actions buttons that open external links in a new tab
const buttonProps = {
  rel: "noreferrer noopener",
  target: "_blank",
  component: "a",
  color: "secondary",
  size: "small",
  style: {
    fontSize: 11
  }
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

  render() {
    const { article, classes } = this.props;
    const { thumbnail, info } = article;
    const { pdfLink, googleLink } = this.state;

    return (
      <Card className={classes.card} component="section">
        <div className={classes.content}>
          <div className={classes.text}>
            <OverflowFade />
            <Typography
              variant="title"
              color="secondary"
              className={classes.title}
              component="h3"
            >
              {article.info.title}
            </Typography>
            <Typography
              className={classes.description}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {article.info.description}
            </Typography>
          </div>
          <div className={classes.cardActions}>
            <Button {...buttonProps} className={classes.link} href={info.link}>
              {labels.page}
            </Button>
            <Button {...buttonProps} color="secondary" href={pdfLink}>
              {labels.pdf}
            </Button>
            <Button {...buttonProps} color="secondary" href={googleLink}>
              {labels.google}
            </Button>
          </div>
        </div>
        {thumbnail && (
          <CardMedia
            className={classes.cardMedia}
            image={thumbnail.source}
            title={article.info.title}
          />
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(ArticleCard);
