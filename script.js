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
    if (!nsfw) return true;

    return song.nsfw === !nsfw;
  }
}

const listing = new SongListing();
