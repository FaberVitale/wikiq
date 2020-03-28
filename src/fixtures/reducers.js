/* Initial state of the  store */
export const initState = {
  theme: "light",
  searches: {},
  articles: {},
  thumbnails: {},
};

export const initSearch = {
  ids: null,
  fetchState: 0,
  error: null,
  thumbnails: 0,
};

export const lang = "en";

export const query = "rem";

export const searchId = "en/rem";

export const ids = [
  "en/Rem",
  "en/Rembrandt",
  "en/Remote+control",
  "en/Remy+Ma",
  "en/Remembrance+Day",
  "en/Remington+Arms",
  "en/Remittance",
  "en/Remain+in+Light",
  "en/Removal+of+cannabis+from+Schedule+I+of+the+Controlled+Substances+Act",
  "en/Remembrance+poppy",
  "en/Rem+Koolhaas",
  "en/Remedial+education",
  "en/Remilitarization+of+the+Rhineland",
  "en/Remote+Desktop+Protocol",
  "en/Remember+the+Titans",
  "en/Removal+of+Confederate+monuments+and+memorials",
  "en/Remote+sensing",
  "en/Remington+Steele",
  "en/Remand+(detention)",
  "en/Remix+culture",
  "en/Remote+viewing",
  "en/Remix",
  "en/Remote+Desktop+Services",
  "en/Remote+control+animal",
  "en/Remington+adaptive+combat+rifle",
  "en/Remember+Me+(2010+film)",
  "en/Remya+Nambeesan",
  "en/Remington+Model+870",
  "en/Remington+Model+700",
  "en/Reminiscence+bump",
];

export const articles = {
  "en/Rem": {
    title: "Rem",
    description: "Rem or REM may refer to:",
    link: "https://en.wikipedia.org/wiki/Rem",
  },
  "en/Rembrandt": {
    title: "Rembrandt",
    description:
      "Rembrandt Harmenszoon van Rijn (; Dutch: [ˈrɛmbrɑnt ˈɦɑrmə(n)soːn vɑn ˈrɛin] ( listen); 15 July 1606 – 4 October 1669) was a Dutch draughtsman, painter, and printmaker.",
    link: "https://en.wikipedia.org/wiki/Rembrandt",
  },
  "en/Remote+control": {
    title: "Remote control",
    description:
      "In electronics, a remote control is a component of an electronic device used to operate the device from a distance, usually wirelessly.",
    link: "https://en.wikipedia.org/wiki/Remote_control",
  },
  "en/Remy+Ma": {
    title: "Remy Ma",
    description:
      "Reminisce Mackie (née Smith; May 30, 1980), known professionally as Remy Ma, is an American rapper. She was initially discovered by Big Pun, and came to prominence for her work as a member of Fat Joe’s group, Terror Squad.",
    link: "https://en.wikipedia.org/wiki/Remy_Ma",
  },
  "en/Remembrance+Day": {
    title: "Remembrance Day",
    description:
      "Remembrance Day (sometimes known informally as Poppy Day) is a memorial day observed in Commonwealth of Nations member states since the end of the First World War to remember the members of their armed forces who have died in the line of duty.",
    link: "https://en.wikipedia.org/wiki/Remembrance_Day",
  },
  "en/Remington+Arms": {
    title: "Remington Arms",
    description:
      "Remington Arms Company, LLC is an American manufacturer of firearms and ammunition in the United States.",
    link: "https://en.wikipedia.org/wiki/Remington_Arms",
  },
  "en/Remittance": {
    title: "Remittance",
    description:
      "A remittance is a transfer of money by a foreign worker to an individual in his or her home country. Money sent home by migrants competes with international aid as one of the largest financial inflows to developing countries.",
    link: "https://en.wikipedia.org/wiki/Remittance",
  },
  "en/Remain+in+Light": {
    title: "Remain in Light",
    description:
      "Remain in Light is the fourth studio album by American new wave band Talking Heads, released on October 8, 1980 through Sire Records.",
    link: "https://en.wikipedia.org/wiki/Remain_in_Light",
  },
  "en/Removal+of+cannabis+from+Schedule+I+of+the+Controlled+Substances+Act": {
    title:
      "Removal of cannabis from Schedule I of the Controlled Substances Act",
    description:
      'The removal of cannabis from Schedule I of the Controlled Substances Act, the most tightly restricted category reserved for drugs that have "no currently accepted medical use," has been proposed repeatedly since 1972.',
    link:
      "https://en.wikipedia.org/wiki/Removal_of_cannabis_from_Schedule_I_of_the_Controlled_Substances_Act",
  },
  "en/Remembrance+poppy": {
    title: "Remembrance poppy",
    description:
      "The remembrance poppy is an artificial flower that has been used since 1921 to commemorate military personnel who have died in war, and represents a common or field poppy, Papaver rhoeas.",
    link: "https://en.wikipedia.org/wiki/Remembrance_poppy",
  },
  "en/Rem+Koolhaas": {
    title: "Rem Koolhaas",
    description:
      'Remment Lucas "Rem" Koolhaas (Dutch pronunciation: [rɛm koːlɦaːs]; born 17 November 1945) is a Dutch architect, architectural theorist, urbanist and Professor in Practice of Architecture and Urban Design at the Graduate School of Design at Harvard University.',
    link: "https://en.wikipedia.org/wiki/Rem_Koolhaas",
  },
  "en/Remedial+education": {
    title: "Remedial education",
    description:
      "Remedial education (also known as developmental education, basic skills education, compensatory education, preparatory education, and academic upgrading) is assigned to assist students in order to achieve expected competencies in core academic skills such as literacy and numeracy.",
    link: "https://en.wikipedia.org/wiki/Remedial_education",
  },
  "en/Remilitarization+of+the+Rhineland": {
    title: "Remilitarization of the Rhineland",
    description:
      "The Remilitarization of the Rhineland by the German Army took place on 7 March 1936 when German military forces entered the Rhineland.",
    link: "https://en.wikipedia.org/wiki/Remilitarization_of_the_Rhineland",
  },
  "en/Remote+Desktop+Protocol": {
    title: "Remote Desktop Protocol",
    description:
      "Remote Desktop Protocol (RDP) is a proprietary protocol developed by Microsoft, which provides a user with a graphical interface to connect to another computer over a network connection.",
    link: "https://en.wikipedia.org/wiki/Remote_Desktop_Protocol",
  },
  "en/Remember+the+Titans": {
    title: "Remember the Titans",
    description:
      "Remember the Titans is a 2000 American sports film produced by Jerry Bruckheimer and directed by Boaz Yakin.",
    link: "https://en.wikipedia.org/wiki/Remember_the_Titans",
  },
  "en/Removal+of+Confederate+monuments+and+memorials": {
    title: "Removal of Confederate monuments and memorials",
    description:
      "For decades in the U.S., there have been isolated incidents of removal of Confederate monuments and memorials, although generally opposed in public opinion polls, and several U.S.",
    link:
      "https://en.wikipedia.org/wiki/Removal_of_Confederate_monuments_and_memorials",
  },
  "en/Remote+sensing": {
    title: "Remote sensing",
    description:
      "Remote sensing is the acquisition of information about an object or phenomenon without making physical contact with the object and thus in contrast to on-site observation.",
    link: "https://en.wikipedia.org/wiki/Remote_sensing",
  },
  "en/Remington+Steele": {
    title: "Remington Steele",
    description:
      "Remington Steele is an American television series co-created by Robert Butler and Michael Gleason. The series, starring Stephanie Zimbalist and Pierce Brosnan, was produced by MTM Enterprises and first broadcast on the NBC network from 1982 to 1987. The series blended the genres of romantic comedy, drama, and detective procedural.",
    link: "https://en.wikipedia.org/wiki/Remington_Steele",
  },
  "en/Remand+(detention)": {
    title: "Remand (detention)",
    description:
      "Remand (also known as pre-trial detention or provisional detention) is the process of detaining a person who has been arrested and charged with a criminal offense until their trial.",
    link: "https://en.wikipedia.org/wiki/Remand_(detention)",
  },
  "en/Remix+culture": {
    title: "Remix culture",
    description:
      "Remix culture, sometimes read-write culture, is a society that allows and encourages derivative works by combining or editing existing materials to produce a new creative work or product.",
    link: "https://en.wikipedia.org/wiki/Remix_culture",
  },
  "en/Remote+viewing": {
    title: "Remote viewing",
    description:
      'Remote viewing (RV) is the practice of seeking impressions about a distant or unseen target, purportedly using extrasensory perception (ESP) or "sensing" with the mind.',
    link: "https://en.wikipedia.org/wiki/Remote_viewing",
  },
  "en/Remix": {
    title: "Remix",
    description:
      "A remix is a piece of media which has been altered from its original state by adding, removing, and/or changing pieces of the item.",
    link: "https://en.wikipedia.org/wiki/Remix",
  },
  "en/Remote+Desktop+Services": {
    title: "Remote Desktop Services",
    description:
      "Remote Desktop Services (RDS), known as Terminal Services in Windows Server 2008 and earlier, is one of the components of Microsoft Windows that allows a user to take control of a remote computer or virtual machine over a network connection.",
    link: "https://en.wikipedia.org/wiki/Remote_Desktop_Services",
  },
  "en/Remote+control+animal": {
    title: "Remote control animal",
    description:
      "Remote control animals are animals that are controlled remotely by humans. Some applications require electrodes to be implanted in the animal's nervous system connected to a receiver which is usually carried on the animal's back.",
    link: "https://en.wikipedia.org/wiki/Remote_control_animal",
  },
  "en/Remington+adaptive+combat+rifle": {
    title: "Remington adaptive combat rifle",
    description:
      "The Remington ACR (Adaptive Combat Rifle) is a modular assault rifle designed by Magpul Industries of Austin, Texas and was known as the Masada.",
    link: "https://en.wikipedia.org/wiki/Remington_adaptive_combat_rifle",
  },
  "en/Remember+Me+(2010+film)": {
    title: "Remember Me (2010 film)",
    description:
      "Remember Me is a 2010 American romantic coming-of-age drama film directed by Allen Coulter, and screenplay by Will Fetters.",
    link: "https://en.wikipedia.org/wiki/Remember_Me_(2010_film)",
  },
  "en/Remya+Nambeesan": {
    title: "Remya Nambeesan",
    description:
      "Ramya Nambeesan is an Indian film actress and playback singer who appears in Malayalam and Tamil films.",
    link: "https://en.wikipedia.org/wiki/Remya_Nambeesan",
  },
  "en/Remington+Model+870": {
    title: "Remington Model 870",
    description:
      "The Remington Model 870 is a pump-action shotgun manufactured by Remington Arms Company, LLC. It is widely used by the public for sport shooting, hunting, and self-defense and used by law enforcement and military organizations worldwide.",
    link: "https://en.wikipedia.org/wiki/Remington_Model_870",
  },
  "en/Remington+Model+700": {
    title: "Remington Model 700",
    description:
      "The Remington Model 700 is a series of bolt-action rifles manufactured by Remington Arms since 1962. All are based on the same centerfire bolt action.",
    link: "https://en.wikipedia.org/wiki/Remington_Model_700",
  },
  "en/Reminiscence+bump": {
    title: "Reminiscence bump",
    description:
      "The reminiscence bump is the tendency for older adults to have increased recollection for events that occurred during their adolescence and early adulthood.",
    link: "https://en.wikipedia.org/wiki/Reminiscence_bump",
  },
};

export const thumbnails = {
  "en/Remembrance+Day": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Cenotaph_London.jpg/185px-Cenotaph_London.jpg",
    width: 185,
    height: 280,
  },
  "en/Remote+control": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Siri_Remote_and_old_Apple_Remote.JPG/280px-Siri_Remote_and_old_Apple_Remote.JPG",
    width: 280,
    height: 202,
  },
  "en/Remy+Ma": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Remy_MA_BET_AWARDS_2016.jpg/206px-Remy_MA_BET_AWARDS_2016.jpg",
    width: 206,
    height: 280,
  },
  "en/Remittance": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Remittance_advert_Oxford_Street_London_20060909.jpg/280px-Remittance_advert_Oxford_Street_London_20060909.jpg",
    width: 280,
    height: 186,
  },
  "en/Remembrance+poppy": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Field_poppy_-_Papaver_rhoeas_%2812190335083%29.jpg/280px-Field_poppy_-_Papaver_rhoeas_%2812190335083%29.jpg",
    width: 280,
    height: 187,
  },
  "en/Rembrandt": {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/216px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
    width: 216,
    height: 280,
  },
};

/* full redux stores that are snapshots of the app state during the request of
 * of search
 */
export const search = {
  fetching: {
    ...initState,
    searches: {
      [searchId]: { ...initSearch, fetchState: 1 },
    },
  },
  fetched: {
    ...initState,
    searches: {
      [searchId]: {
        ...initSearch,
        ids,
        fetchState: 0,
        thumbnails: 10,
      },
    },
    articles,
    thumbnails,
  },
  fetchError: {
    ...initState,
    searches: {
      [searchId]: {
        ...initSearch,
        error: "Failed to fetch",
      },
    },
  },
  fetchedAllThumbnails: {
    ...initState,
    searches: {
      [searchId]: {
        ...initSearch,
        ids,
        fetchState: 0,
        thumbnails: 30,
      },
    },
    articles,
    thumbnails,
  },
  fetchingThumbnails: {
    ...initState,
    searches: {
      [searchId]: {
        ...initSearch,
        ids,
        fetchState: 2,
        thumbnails: 20,
      },
    },
    articles,
    thumbnails,
  },
};
