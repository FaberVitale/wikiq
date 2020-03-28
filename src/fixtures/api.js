import { query, articles, ids } from "./reducers";

export const openSearch = ids.reduce(
  (openSearch, id) => {
    openSearch[1].push(articles[id].title);
    openSearch[2].push(articles[id].description);
    openSearch[3].push(articles[id].link);

    return openSearch;
  },
  [query, [], [], []]
);

export const thumbnails = {
  batchcomplete: "",
  query: {
    pages: {
      "25945": {
        pageid: 25945,
        ns: 0,
        title: "Rem Koolhaas",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Rem_Koolhaas_2013.jpg/280px-Rem_Koolhaas_2013.jpg",
          width: 280,
          height: 187,
        },
        pageimage: "Rem_Koolhaas_2013.jpg",
      },
      "228148": {
        pageid: 228148,
        ns: 0,
        title: "Remote sensing",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Death-valley-sar.jpg/134px-Death-valley-sar.jpg",
          width: 134,
          height: 280,
        },
        pageimage: "Death-valley-sar.jpg",
      },
      "361881": { pageid: 361881, ns: 0, title: "Remington Steele" },
      "397574": { pageid: 397574, ns: 0, title: "Remember the Titans" },
      "652617": { pageid: 652617, ns: 0, title: "Remote Desktop Protocol" },
      "2033759": {
        pageid: 2033759,
        ns: 0,
        title: "Remix culture",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Marcel_Duchamp_Mona_Lisa_LHOOQ.jpg/177px-Marcel_Duchamp_Mona_Lisa_LHOOQ.jpg",
          width: 177,
          height: 280,
        },
        pageimage: "Marcel_Duchamp_Mona_Lisa_LHOOQ.jpg",
      },
      "7734670": {
        pageid: 7734670,
        ns: 0,
        title: "Remilitarization of the Rhineland",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Rhineland.jpg/280px-Rhineland.jpg",
          width: 280,
          height: 218,
        },
        pageimage: "Rhineland.jpg",
      },
      "14632360": {
        pageid: 14632360,
        ns: 0,
        title: "Remand (detention)",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Justice_statue.jpg/210px-Justice_statue.jpg",
          width: 210,
          height: 280,
        },
        pageimage: "Justice_statue.jpg",
      },
      "18680159": { pageid: 18680159, ns: 0, title: "Remedial education" },
      "54925688": {
        pageid: 54925688,
        ns: 0,
        title: "Removal of Confederate monuments and memorials",
        thumbnail: {
          source:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Robert_E_Lee_statue_removed_from_column_New_Orleans_19_May_2017_12.jpg/210px-Robert_E_Lee_statue_removed_from_column_New_Orleans_19_May_2017_12.jpg",
          width: 210,
          height: 280,
        },
        pageimage:
          "Robert_E_Lee_statue_removed_from_column_New_Orleans_19_May_2017_12.jpg",
      },
    },
  },
};
