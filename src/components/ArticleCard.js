//@flow
import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import withStyles from "material-ui/styles/withStyles";
import Typography from "material-ui/Typography";
import { getPDFLink, slugify } from "../util/query";
import { applyEllipsis } from "../util/functions";
import {
  ELLIPSIS_TITLE_THRESHOLD,
  ELLIPSIS_DESCRIPTION_THRESHOLD,
  CARD_MARGIN,
  CARD_SIDE
} from "../config";
import { xsDown } from "../theme";
import type { WikiArticle } from "../reducers";

const cardSideHalf = CARD_SIDE >>> 1;

const styles = {
  //[thumbnail] + text displayed vertically
  card: {
    width: CARD_SIDE,
    height: CARD_SIDE,
    overflow: "hidden",
    flexShrink: 0,
    margin: `${CARD_MARGIN}px calc(25% - ${cardSideHalf}px)`,
    [xsDown]: {
      margin: `${CARD_MARGIN}px calc(50% - ${cardSideHalf}px)`
    }
  },
  //thumbnail + text displayed horizontally
  cardWithMediaVert: {
    display: "flex"
  },
  textLandscape: {
    position: "relative"
  },
  textNoThumbnail: {
    position: "relative",
    height: "100%"
  },
  textPortrait: {
    position: "relative",
    width: CARD_SIDE - 100
  },
  description: {
    height: 106
  },
  title: {
    marginBottom: 8
  },
  cardActions: {
    position: "absolute",
    left: 0,
    bottom: 8,
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    width: "100%"
  },
  cardMedia: {
    /* set min dimensions or it will be displayed collapsed
       * dimensions:
       * - portrait width: 100, height: CARD_SIDE
       * - landscape width: CARD_SIDE, height: 100 
       */
    minWidth: 100,
    minHeight: 100,
    backgroundSize: "cover",
    //some thumbnail has trasparency and was meant to be displayed on a white
    //background (wikipedia standard page)
    backgroundColor: "#ffffff"
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
  ellipsedTitle: string,
  ellipsedDescription: string,
  isThumbnailPortrait: boolean,
  pdfLink: string
};

// text of the ext links
const labels = {
  page: "View Page",
  pdf: "View Pdf"
};

// Props for Card Actions buttons that open external links in a new tab
const buttonProps = {
  rel: "noreferrer noopener",
  target: "_blank",
  component: "a",
  color: "secondary",
  size: "small"
};

const getDerivedState: (props: Props) => State = ({ article, lang }) => ({
  lang,
  title: article.info.title,
  ellipsedTitle: applyEllipsis(ELLIPSIS_TITLE_THRESHOLD, article.info.title),
  ellipsedDescription: applyEllipsis(
    ELLIPSIS_DESCRIPTION_THRESHOLD,
    article.info.description
  ),
  pdfLink: getPDFLink(lang, slugify(article.info.title)),
  isThumbnailPortrait:
    !!article.thumbnail && article.thumbnail.width < article.thumbnail.height
});

class ArticleCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

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

    const {
      ellipsedDescription,
      ellipsedTitle,
      isThumbnailPortrait,
      pdfLink
    } = this.state;

    return (
      <Card
        className={
          isThumbnailPortrait
            ? `${classes.card} ${classes.cardWithMediaVert}`
            : classes.card
        }
        component="section"
      >
        {thumbnail && (
          <CardMedia
            className={classes.cardMedia}
            title={info.title}
            image={thumbnail.source}
          />
        )}
        <CardContent
          className={
            isThumbnailPortrait
              ? classes.textPortrait
              : thumbnail
                ? classes.textLandscape
                : classes.textNoThumbnail
          }
        >
          <Typography
            variant="title"
            color="secondary"
            className={classes.title}
            component="h3"
          >
            {ellipsedTitle}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {ellipsedDescription}
          </Typography>
          <div className={classes.cardActions}>
            <Button {...buttonProps} className={classes.link} href={info.link}>
              {labels.page}
            </Button>
            <Button {...buttonProps} color="secondary" href={pdfLink}>
              {labels.pdf}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ArticleCard);
