//@flow
import type { WikiArticleInfo } from "../reducers";

// cache reference to the native methods
const baseEncodeURIComponent = encodeURIComponent;

const baseDecodeURIComponent = decodeURIComponent;

export const slugify = (val: string) =>
  baseEncodeURIComponent(val).replace(/%20/g, "_");

export const deslugify = (val: string) =>
  baseDecodeURIComponent(val.replace(/_/g, "\u0020"));

export const encodeComponent = (val: string) =>
  baseEncodeURIComponent(val).replace(/%20/g, "+");

export const decodeComponent = (val: string) =>
  baseDecodeURIComponent(val.replace(/\+/g, "%20"));

export const getOpenSearchURL = (
  lang: string,
  query: string,
  limit?: number = 10
) =>
  `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${limit}&namespace=0&format=json&origin=*`;

export const getThumbnailURL = (
  lang: string,
  titles: Array<string>,
  maxWidth: number = 100
) => {
  const query = titles.map(encodeURIComponent).join("|");

  return `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&origin=*&pithumbsize=${maxWidth}`;
};

export const makeSearchId = (lang: string, query: string) =>
  `/${lang}/${encodeComponent(query)}`;

/* Given a locale and a title slug returns the link to the pdf of the article*/
export const getPDFLink = (lang: string, title: string) =>
  `https://${lang}.wikipedia.org/api/rest_v1/page/pdf/${title}`;

export const getGoogleSearchLink = (query: string) =>
  `https://google.com/search?q=${encodeComponent(query.toLowerCase())}`;

export const fetchJSON: (
  input: RequestInfo,
  init?: RequestOptions
) => Promise<any> = async (input, init) => {
  const res = await fetch(input, init);

  if (res.status === 200) {
    return res.json();
  }

  let url = typeof input === "string" ? input : input.toString();

  throw new Error(
    `response status not 200. url: ${url}, status: ${res.status}`
  );
};

const makeArticleInfo: (
  title: string,
  description: string,
  link: string
) => WikiArticleInfo = (title, description, link) => ({
  title,
  description,
  link
});

export const makeArticleId = (lang: string, title: string) =>
  `${lang}/${encodeComponent(title)}`;

export const transformSearch: (
  lang: string,
  data: OpenSearch
) => { articles: Array<WikiArticleInfo>, ids: Array<string> } = (
  lang,
  data
) => {
  const [, titles, descriptions, links] = data;

  const articles = [];
  const ids = [];

  const len = titles.length;

  for (let i = 0; i < len; i++) {
    if (descriptions[i]) {
      articles.push(makeArticleInfo(titles[i], descriptions[i], links[i]));
      ids.push(makeArticleId(lang, titles[i]));
    }
  }

  return {
    articles,
    ids
  };
};

/* returns an object that maps titles to thumbnail links */
export const extractThumbnails = (lang: string, pages: {} = {}) => {
  const res = {};
  const ids = Object.keys(pages);

  for (let i = 0, len = ids.length, id = ids[i]; i < len; i++, id = ids[i]) {
    const title = pages[id].title;
    const thumbnail = pages[id].thumbnail;

    if (thumbnail) {
      res[makeArticleId(lang, title)] = thumbnail;
    }
  }

  return res;
};
