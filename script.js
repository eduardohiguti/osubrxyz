const ListingModes = {
  todos: "all",
  osu: "osu",
  taiko: "taiko",
  catch: "catch",
  mania: "mania",
};

const ListingGenres = {
  Todos: "Todos",
  Anos80: "Anos 80",
  Arrocha: "Arrocha",
  Brega: "Brega",
  Drum: "Drum N Bass",
  Eletrônica: "Eletrônica",
  Emo: "Emo",
  Forró: "Forró",
  Funk: "Funk",
  Gospel: "Gospel",
  HeavyMetal: "Heavy Metal",
  Indie: "Indie",
  LEWD: "LEWD",
  LoFi: "Lo-Fi",
  Mashup: "Mashup",
  Meme: "Meme",
  MPB: "MPB",
  Pagode: "Pagode",
  Rap: "Rap",
  RockAlternativo: "Rock Alternativo",
  RockComico: "Rock Comico",
  Samba: "Samba",
  Sertanejo: "Sertanejo",
  Trap: "Trap",
  VirtualPiano: "Virtual Piano",
  YTPBR: "YTPBR",
};

const ListingFilterElementProperties = {
  Mode0: "mode:0",
  Mode1: "mode:1",
  Mode2: "mode:2",
  Mode3: "mode:3",
  ModeTodos: "mode:Todos",
  GenreTodos: "genre:Todos",
  GenreAnos80: "genre:Anos 80",
  GenreArrocha: "genre:Arrocha",
  GenreBrega: "genre:Brega",
  GenreDrum: "genre:Drum N Bass",
  GenreEletrônica: "genre:Eletrônica",
  GenreEmo: "genre:Emo",
  GenreForró: "genre:Forró",
  GenreFunk: "genre:Funk",
  GenreGospel: "genre:Gospel",
  GenreHeavyMetal: "genre:Heavy Metal",
  GenreIndie: "genre:Indie",
  GenreLEWD: "genre:LEWD",
  GenreLoFi: "genre:Lo-Fi",
  GenreMashup: "genre:Mashup",
  GenreMeme: "genre:Meme",
  GenreMPB: "genre:MPB",
  GenrePagode: "genre:Pagode",
  GenreRap: "genre:Rap",
  GenreRockAlternativo: "genre:Rock Alternativo",
  GenreRockComico: "genre:Rock Cômico",
  GenreSamba: "genre:Samba",
  GenreSertanejo: "genre:Sertanejo",
  GenreTrap: "genre:Trap",
  GenreVirtualPiano: "genre:Virtual Piano",
  GenreYTPBR: "genre:YTPBR",
  NSFWEnable: "nsfw:true",
  NSFWDisable: "nsfw:false",
};

const AllListingPropertiesOf = (category) =>
  Object.keys(ListingFilterElementProperties)
    .map((key) => ListingFilterElementProperties[key])
    .filter((filter) => filter.startsWith(category.concat(":")));
/**
 * @typedef {"mode:0" | "mode:1" | "mode:2" | "mode:3" | "mode:all" |
 *           "genre:Todos" | "genre:Anos 80" | "genre:Arrocha" | "genre:Brega" | "genre:Drum N Bass" |
 *           "genre:Eletrônica" | "genre:Emo" | "genre:Forró" | "genre:Funk" | "genre:Gospel" |
 *           "genre:Heavy Metal" | "genre:Indie" | "genre:LEWD" | "genre:Lo-Fi" | "genre:Mashup" |
 *           "genre:Meme" | "genre:MPB" | "genre:Pagode" | "genre:Rap" | "genre:Rock Alternativo" |
 *           "genre:Rock Comico" | "genre:Samba" | "genre:Sertanejo" | "genre:Trap" | "genre:Virtual Piano" |
 *           "genre:YTPBR" | "nsfw:true" | "nsfw:false"} ListingFilterValue
 */

/**
 * @typedef {"genre:Todos" | "genre:Anos 80" | "genre:Arrocha" | "genre:Brega" | "genre:Drum N Bass" |
 *           "genre:Eletrônica" | "genre:Emo" | "genre:Forró" | "genre:Funk" | "genre:Gospel" |
 *           "genre:Heavy Metal" | "genre:Indie" | "genre:LEWD" | "genre:Lo-Fi" | "genre:Mashup" |
 *           "genre:Meme" | "genre:MPB" | "genre:Pagode" | "genre:Rap" | "genre:Rock Alternativo" |
 *           "genre:Rock Comico" | "genre:Samba" | "genre:Sertanejo" | "genre:Trap" | "genre:Virtual Piano" |
 *           "genre:YTPBR" } ListingGenreFilterValue
 */

/**
 * @typedef { "mode:0" | "mode:1" | "mode:2" | "mode:3" | "mode:all" } ListingModesFilterValue
 */

/**
 * @typedef { "nsfw:true" | "nsfw:false" } ListingNSFWFilterValue
 */

class SongListing {
  // filters
  filterNSFW = true;
  filterGenres = [ListingFilterElementProperties.GenreTodos];
  filterModes = [ListingFilterElementProperties.ModeTodos];
  search = "";

  // pagination
  allSongs = data.map((data) => new Song(data));

  /**
   * @type {Song}
   */
  filteredSongs = [];

  /**
   * @type {Song[][]}
   */
  pages = [[]];
  currentPage = 0;
  sizeByPage = 15;

  // DOM elements
  searchInput = document.getElementById("searches");
  resultCountDisplayer = document.getElementById("count");
  listingContainer = document.getElementById("list");

  // extras
  preview = new PreviewPlayer();

  constructor() {
    this.listSongs();
  }

  listSongs() {
    this.filterSongs();
    this.updateListingResultsCount();

    this.listingContainer.innerHTML = "";

    for (const song of this.filteredSongs) {
      list.appendChild(new SongSelector(song).buildHTML(), this);
    }
  }

  updateListingResultsCount() {
    this.resultCountDisplayer.innerText = this.filteredSongs.length;
  }

  /**
   * @param {ListingGenreFilterValue} genre
   */
  toggleGenreFilter(genre) {
    if (this.filterGenres.includes(genre)) {
      this.filterGenres = this.filterGenres.filter((g) => g != genre);
    } else {
      this.filterGenres.push(genre);
    }

    if (genre != ListingFilterElementProperties.GenreTodos) {
      this.filterGenres = this.filterGenres.filter(
        (genre) => genre != ListingFilterElementProperties.GenreTodos
      );
    }

    if (genre == ListingFilterElementProperties.GenreTodos) {
      this.resetAllCategoryFiltersToDefault(
        "genre",
        ListingFilterElementProperties.GenreTodos
      );

      this.filterGenres = [ListingFilterElementProperties.GenreTodos];
    } else {
      this.updateFilterElement(
        genre,
        ListingFilterElementProperties.GenreTodos
      );
    }

    this.filterSongs();
    this.listSongs();
  }

  /**
   * @param {ListingModesFilterValue} mode
   */
  toggleModeFilter(mode) {
    if (this.filterModes.includes(mode)) {
      this.filterModes = this.filterModes.filter((g) => g != mode);
    } else {
      this.filterModes.push(mode);
    }

    if (mode != ListingFilterElementProperties.ModeTodos) {
      this.filterModes = this.filterModes.filter(
        (mode) => mode != ListingFilterElementProperties.ModeTodos
      );
    }

    if (mode == ListingFilterElementProperties.ModeTodos) {
      this.resetAllCategoryFiltersToDefault(
        "mode",
        ListingFilterElementProperties.ModeTodos
      );

      this.filterModes = [ListingFilterElementProperties.ModeTodos];
    } else {
      this.updateFilterElement(mode, ListingFilterElementProperties.ModeTodos);
    }

    this.filterSongs();
    this.listSongs();
  }

  /**
   * @param {string} content
   */
  handleSearch(content) {
    this.search = content;

    this.listSongs();
  }

  /**
   * @param {Boolean} status
   */
  setNSFW(status) {
    this.filterNSFW = status;

    if (this.filterNSFW) {
      this.updateFilterElement("nsfw:true", true);
      this.updateFilterElement("nsfw:false", false);
    } else {
      this.updateFilterElement("nsfw:true", false);
      this.updateFilterElement("nsfw:false", true);
    }

    this.filterSongs();
    this.listSongs();
  }

  /**
   * @param {ListingFilterValue} filter
   * @param {ListingFilterValue} defaultFilter
   * @param {Boolean} active
   */
  updateFilterElement(filter, defaultFilter) {
    const element = document.querySelector(`button[data-filter="${filter}"]`);

    // Disable "Todos" filter
    if (filter != defaultFilter) {
      const filterGenreTodosElement = document.querySelector(
        `button[data-filter="${defaultFilter}"]`
      );

      if (filterGenreTodosElement) {
        filterGenreTodosElement.classList.remove("active");
      }
    }

    if (element) element.classList.toggle("active");
  }

  /**
   * @param {string} filterCategory
   * @param {string} defaultFilter
   */
  resetAllCategoryFiltersToDefault(filterCategory, defaultFilter) {
    const listingFiltersOf = AllListingPropertiesOf(filterCategory);

    const buttons = Array.from(
      document.querySelectorAll("button[data-filter]")
    ).filter((element) =>
      listingFiltersOf.includes(element.getAttribute("data-filter"))
    );

    for (const button of buttons) {
      if (button) button.classList.remove("active");
    }

    const defaultButton = buttons.find(
      (button) => button.getAttribute("data-filter") == defaultFilter
    );

    if (defaultButton) {
      defaultButton.classList.add("active");
    }
  }

  /**
   * @returns {DataContent[][]}
   */
  buildPages() {
    const chunkedArray = [];
    let index = 0;

    while (index < arr.length) {
      chunkedArray.push(
        this.filteredSongs.slice(index, index + this.sizeByPage)
      );
      index += this.sizeByPage;
    }

    return chunkedArray;
  }

  filterSongs() {
    this.filteredSongs = this.allSongs.filter((song) => {
      if (
        FilterHelpers.MatchGenres(song, this.filterGenres) &&
        FilterHelpers.MatchModes(song, this.filterModes) &&
        FilterHelpers.MatchNSFW(song, this.filterNSFW)
      )
        return true;

      return false;
    });

    if (this.search.trim()) {
      this.filteredSongs = this.filteredSongs.filter((song) => {
        const combinedProperties =
          `${song.artist} ${song.tite} ${song.creator} ${song.username} bpm=${song.bpm}`.toLowerCase();
        return combinedProperties.includes(this.search);
      });
    }
  }
}

class FilterHelpers {
  /**
   * @param {Song} song
   * @param {ListingGenreFilterValue} genres
   */
  static MatchGenres(song, genres) {
    if (genres.includes(ListingFilterElementProperties.GenreTodos)) return true;

    genres = genres.map((genre) =>
      FilterHelpers.sanitizeFilterString("genre", genre)
    );

    return song.genero.some((genre) => genres.includes(genre));
  }

  static sanitizeFilterString(keyword, filter) {
    const keywordLength = keyword.length;

    return filter.slice(keywordLength + 1);
  }

  /**
   * @param {Song} song
   * @param {ListingModesFilterValue} modes
   */
  static MatchModes(song, modes) {
    if (modes.includes(ListingFilterElementProperties.ModeTodos)) return true;

    modes = modes
      .map((mode) => FilterHelpers.sanitizeFilterString("mode", mode))
      .map((mode) => Number(mode));

    console.log(
      song.diffs,
      modes,
      song.diffs.some((difficulty) => modes.includes(difficulty.mode))
    );

    return song.diffs.some((difficulty) => modes.includes(difficulty.mode));
  }

  /**
   * @param {Song} song
   * @param {boolean} nsfw
   */
  static MatchNSFW(song, nsfw) {
    return song.nsfw === !nsfw;
  }
}

const listing = new SongListing();

// const list = document.getElementById("list");
// //const filter = document.querySelector('.filter');
// const searchbox = document.getElementById("searches");
// const count = document.getElementById("count");
// const preview = new PreviewPlayer();
// const listSongs = data;
// let songFilter = listSongs;

// searchbox.addEventListener("keyup", filterComplex);

// function getDiffColour(rating) {
//   if (rating < 0.1) return "#AAAAAA";
//   if (rating >= 9) return "#000000";
//   return difficultyColourSpectrum(rating);
// }

// showSong(songFilter);

// function showSong(songFilter) {
//   for (const song of songFilter) {
//     list.appendChild(new SongSelector(new Song(song)).buildHTML());
//   }

//   count.innerText = songFilter.length;

// count.innerText = songFilter.length;
// list.innerHTML = "";
// songFilter.forEach((item) => {
//   const newItem = document.createElement("div");
//   newItem.classList.add("song");
//   songlink = document.createElement("a");
//   songlink.href = `https://osu.ppy.sh/beatmapsets/${item.id}`;
//   songlink.classList.add("thumbnail");
//   // create image
//   const newImage = new Image();
//   newImage.src = `https://b.ppy.sh/thumb/${item.id}l.jpg`;
//   newImage.setAttribute(
//     "onerror",
//     "this.onerror=null; this.src='assets/nothumb.jpg'"
//   );
//   songlink.appendChild(newImage);
//   newItem.appendChild(songlink);
//   // create name product
//   const newTitle = document.createElement("a");
//   newTitle.href = songlink.href;
//   newTitle.classList.add("title");
//   newTitle.innerText = item.tite;
//   newItem.appendChild(newTitle);
//   // create price
//   const newArtist = document.createElement("div");
//   newArtist.classList.add("artist");
//   newArtist.innerText = item.artist;
//   newItem.appendChild(newArtist);
//   // creator
//   const newCreator = document.createElement("a");
//   newCreator.href = "https://osu.ppy.sh/users/" + item.user_id;
//   newCreator.classList.add("creator");
//   newCreator.innerText = item.username;
//   newItem.appendChild(newCreator);
//   // Diffs
//   const newDifficulties = document.createElement("div");
//   newDifficulties.classList.add("difficulties");
//   newItem.appendChild(newDifficulties);
//   sortedDiffs = item.diffs
//     .sort((a, b) => a.stars - b.stars)
//     .sort((a, b) => a.mode - b.mode);
//   //console.log(sortedDiffs);
//   sortedDiffs.forEach(function (message) {
//     const newDiffs = document.createElement("img");
//     newDiffs.src = "assets/modes/" + message.mode + ".svg";
//     newDiffs.classList.add("message");
//     newDiffColour = getDiffColour(message.stars);
//     if (message.mode == 0) {
//       var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       svg.setAttribute("width", "15px");
//       svg.setAttribute("height", "15px");
//       svg.setAttribute("viewbox", "0 0 15 15");
//       svg.setAttribute("fill", "none");
//       var gtag = document.createElementNS("http://www.w3.org/2000/svg", "g");
//       var circle1 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle1.setAttribute("cx", "7.5");
//       circle1.setAttribute("cy", "7.5");
//       circle1.setAttribute("r", "3.75");
//       circle1.setAttribute("fill", newDiffColour);
//       var circle2 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle2.setAttribute("cx", "7.5");
//       circle2.setAttribute("cy", "7.5");
//       circle2.setAttribute("r", "6.875");
//       circle2.setAttribute("stroke-width", "1.25");
//       circle2.setAttribute("stroke", newDiffColour);
//       gtag.appendChild(circle1);
//       gtag.appendChild(circle2);
//       svg.appendChild(gtag);
//       newDifficulties.appendChild(svg);
//     } else if (message.mode == 1) {
//       var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       svg.setAttribute("width", "15px");
//       svg.setAttribute("height", "15px");
//       svg.setAttribute("viewbox", "0 0 15 15");
//       svg.setAttribute("fill", "none");
//       var gtag = document.createElementNS("http://www.w3.org/2000/svg", "g");
//       var circle1 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle1.setAttribute("cx", "7.5");
//       circle1.setAttribute("cy", "7.5");
//       circle1.setAttribute("r", "4.375");
//       circle1.setAttribute("stroke-width", "1.25");
//       circle1.setAttribute("stroke", newDiffColour);
//       var circle2 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle2.setAttribute("cx", "7.5");
//       circle2.setAttribute("cy", "7.5");
//       circle2.setAttribute("r", "6.875");
//       circle2.setAttribute("stroke-width", "1.25");
//       circle2.setAttribute("stroke", newDiffColour);
//       var line = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "line"
//       );
//       line.setAttribute("x1", "7.5238");
//       line.setAttribute("y1", "3.125");
//       line.setAttribute("x2", "7.5238");
//       line.setAttribute("y2", "11.875");
//       line.setAttribute("stroke-width", "1.25");
//       line.setAttribute("stroke", newDiffColour);
//       gtag.appendChild(circle1);
//       gtag.appendChild(circle2);
//       gtag.appendChild(line);
//       svg.appendChild(gtag);
//       newDifficulties.appendChild(svg);
//     } else if (message.mode == 2) {
//       var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       svg.setAttribute("width", "15px");
//       svg.setAttribute("height", "15px");
//       svg.setAttribute("viewbox", "0 0 15 15");
//       svg.setAttribute("fill", "none");
//       var gtag = document.createElementNS("http://www.w3.org/2000/svg", "g");
//       var circle1 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle1.setAttribute("cx", "7.5");
//       circle1.setAttribute("cy", "7.5");
//       circle1.setAttribute("r", "6.875");
//       circle1.setAttribute("stroke-width", "1.25");
//       circle1.setAttribute("stroke", newDiffColour);
//       var circle2 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle2.setAttribute("cx", "6.28271");
//       circle2.setAttribute("cy", "4.375");
//       circle2.setAttribute("r", "1.25");
//       circle2.setAttribute("fill", newDiffColour);
//       var circle3 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle3.setAttribute("cx", "6.28271");
//       circle3.setAttribute("cy", "10.625");
//       circle3.setAttribute("r", "1.25");
//       circle3.setAttribute("fill", newDiffColour);
//       var circle4 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle4.setAttribute("cx", "9.40759");
//       circle4.setAttribute("cy", "7.5");
//       circle4.setAttribute("r", "1.25");
//       circle4.setAttribute("fill", newDiffColour);
//       gtag.appendChild(circle1);
//       gtag.appendChild(circle2);
//       gtag.appendChild(circle3);
//       gtag.appendChild(circle4);
//       svg.appendChild(gtag);
//       newDifficulties.appendChild(svg);
//     } else if (message.mode == 3) {
//       var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       svg.setAttribute("width", "15px");
//       svg.setAttribute("height", "15px");
//       svg.setAttribute("viewbox", "0 0 15 15");
//       svg.setAttribute("fill", "none");
//       var gtag = document.createElementNS("http://www.w3.org/2000/svg", "g");
//       var circle1 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle1.setAttribute("cx", "7.5");
//       circle1.setAttribute("cy", "7.5");
//       circle1.setAttribute("r", "6.875");
//       circle1.setAttribute("stroke-width", "1.25");
//       circle1.setAttribute("stroke", newDiffColour);
//       var rect1 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "rect"
//       );
//       rect1.setAttribute("x", "6.5625");
//       rect1.setAttribute("y", "3.5");
//       rect1.setAttribute("width", "1.875");
//       rect1.setAttribute("height", "8.5");
//       rect1.setAttribute("rx", "0.9375");
//       rect1.setAttribute("fill", newDiffColour);
//       var rect2 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "rect"
//       );
//       rect2.setAttribute("x", "4.0625");
//       rect2.setAttribute("y", "5");
//       rect2.setAttribute("width", "1.875");
//       rect2.setAttribute("height", "5");
//       rect2.setAttribute("rx", "0.9375");
//       rect2.setAttribute("fill", newDiffColour);
//       var rect3 = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "rect"
//       );
//       rect3.setAttribute("x", "9.0625");
//       rect3.setAttribute("y", "5");
//       rect3.setAttribute("width", "1.875");
//       rect3.setAttribute("height", "5");
//       rect3.setAttribute("rx", "0.9375");
//       rect3.setAttribute("fill", newDiffColour);
//       gtag.appendChild(circle1);
//       gtag.appendChild(rect1);
//       gtag.appendChild(rect2);
//       gtag.appendChild(rect3);
//       svg.appendChild(gtag);
//       newDifficulties.appendChild(svg);
//     }
//     //newDifficulties.appendChild(newDiffs);
//   });
//   list.appendChild(newItem);
// });
//}

// explicitFilter = "yes";
// genreFilter = "all";
// modeFilter = "all";
// function filterComplex() {
//   event.preventDefault();
//   let valueFilter = searchbox;

//   songFilter = listSongs.filter((item) => {
//     if (valueFilter.value != "") {
//       if (!JSON.stringify(item).includes(valueFilter.value)) {
//         return false;
//       }
//     }

//     if (modeFilter != "all") {
//       if (!JSON.stringify(item).includes(modeFilter)) {
//         return false;
//       }
//     }

//     if (genreFilter != "all") {
//       if (!JSON.stringify(item.genero).includes(genreFilter)) {
//         console.log(typeof item.nsfw);
//         return false;
//       }
//     }

//     if (explicitFilter == "yes") {
//       if (item.nsfw === true) {
//         console.log("kurukurukuru");
//         return false;
//       }
//     }

//     return true;
//   });
//   showSong(songFilter);
// }

// //filter.addEventListener('submit', filterComplex);

// const filterModes = document.querySelectorAll("#filter-mode button");

// const filterModos = (e) => {
//   document.querySelector("#filter-mode .active").classList.remove("active");
//   e.target.classList.add("active");
//   modeFilter = e.target.dataset.filter;
//   console.log(modeFilter);
//   filterComplex();
// };

// filterModes.forEach((button) => button.addEventListener("click", filterModos));
// //filterModes.forEach(button => button.addEventListener("mouseleave", filterComplex));

// const filterGenres = document.querySelectorAll("#filter-genre button");

// const filterGeneros = (e) => {
//   document.querySelector("#filter-genre .active").classList.remove("active");
//   e.target.classList.add("active");
//   genreFilter = e.target.dataset.filter;
//   console.log(genreFilter);
//   filterComplex();
// };

// filterGenres.forEach((button) =>
//   button.addEventListener("click", filterGeneros)
// );

// const filterExplicit = document.querySelectorAll("#explicit-mode button");

// const filterExplicitos = (e) => {
//   document.querySelector("#explicit-mode .active").classList.remove("active");
//   e.target.classList.add("active");
//   explicitFilter = e.target.dataset.filter;
//   filterComplex();
//   console.log(
//     "explicit filter=" + explicitFilter + " " + typeof explicitFilter
//   );
// };

// filterExplicit.forEach((button) =>
//   button.addEventListener("click", filterExplicitos)
// );

// window.addEventListener("load", filterComplex);
