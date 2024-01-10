class Song {
  id = 0;
  status = "";
  bpm = 0;
  artist = "Artist";
  tite = "Title";
  user_id = 0;
  creator = "Creator";
  username = "Creator";
  diffs = [
    {
      mode: 0,
      stars: 0,
    },
  ];
  last_updated = new Date();
  thumbnail = "https://assets.ppy.sh/beatmaps/1866667/covers/list.jpg";
  genero = null;
  nsfw = false;

  constructor(data) {
    this.id = data.id;
    this.status = data.status;
    this.bpm = data.bpm;
    this.artist = data.artist;
    this.tite = data.tite;
    this.user_id = data.user_id;
    this.creator = data.creator;
    this.username = data.username;
    this.diffs = data.diffs;
    this.last_updated = data.last_updated;
    this.thumbnail = data.thumbnaill;
    this.genero = data.genero;
    this.nsfw = data.nsfw;
  }

  getCoverURL() {
    return `https://b.ppy.sh/thumb/${this.id}l.jpg`;
  }

  getOsuDirectURL() {
    return `osu://s/${this.id}`;
  }

  getPreviewURL() {
    return `https://b.ppy.sh/preview/${this.id}.mp3`;
  }
}

class SongSelector {
  song;

  /**
   * @param { Song } song
   */
  constructor(song) {
    this.song = song;
  }

  buildHTML() {
    const baseDiv = document.createElement("div");
    baseDiv.classList.add("song");
    baseDiv.innerHTML = `
    <div 
      class="thumbnail"
      onclick="preview.handlePreviewClick(${this.song.id}, '${TextUtils.encodeText(this.song.tite)}', '${TextUtils.encodeText(this.song.artist)}')">
      <img
        src="https://b.ppy.sh/thumb/${this.song.id}l.jpg"
        onerror="this.onerror=null; this.src='assets/nothumb.jpg'" />
      <div class="previewButton" data-beatmapId="${this.song.id}">
        <i class="fa-solid fa-play"></i>
      </div>
    </div>
    <a href="https://osu.ppy.sh/beatmapsets/${
      this.song.id
    }" target="_blank" class="title">${this.song.tite}</a>
    <div class="artist">${this.song.artist}</div>
    <a href="https://osu.ppy.sh/users/${
      this.song.user_id
    }" target="_blank" class="creator">${this.song.username}</a>
    <div class="difficulties">${this.song.diffs
      .map((difficulty) =>
        new DifficultyIcon(difficulty.mode, difficulty.stars).getSVG()
      )
      .join("")}</div>`;

    return baseDiv;
  }
}

class TextUtils {

  /**
   * @param {String} text 
   * @returns string
   */
  static encodeText(text) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i).toString(16);
      result += ('00' + charCode).slice(-2); // Ensure two digits for each character
    }

    return result;
  }

  /**
 * @param {String} text 
 * @returns string
 */
  static decodeText(text) {
    let str = '';

    for (let i = 0; i < text.length; i += 2) {
      let charCode = parseInt(text.substr(i, 2), 16);
      str += String.fromCharCode(charCode);
    }

    return str;
  }
}

class DifficultyIcon {
  mode;
  starRating;

  /**
   * @param {Number} mode
   * @param {Number} starRating
   */
  constructor(mode, starRating) {
    this.mode = mode;
    this.starRating = starRating;
  }

  /**
   * @returns { String }
   */
  buildColor() {
    const difficultyColourSpectrum = d3
      .scaleLinear()
      .domain([0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9])
      .clamp(true)
      .range([
        "#4290FB",
        "#4FC0FF",
        "#4FFFD5",
        "#7CFF4F",
        "#F6F05C",
        "#FF8068",
        "#FF4E6F",
        "#C645B8",
        "#6563DE",
        "#18158E",
        "#000000",
      ])
      .interpolate(d3.interpolateRgb.gamma(2.2));

    if (this.starRating < 0.1) return "#AAAAAA";
    if (this.starRating >= 9) return "#000000";

    return difficultyColourSpectrum(this.starRating);
  }

  /**
   * DO NOT USE EXTERNAL
   */
  buildStdSVG() {
    return `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.8em"
    height="0.8em"
    viewBox="0 0 32 32"
  >
    <path
      fill="${this.buildColor()}"
      d="M16 3.52c6.88 0 12.48 5.6 12.48 12.48S22.88 28.48 16 28.48c-6.88 0-12.48-5.6-12.48-12.48S9.12 3.52 16 3.52m0-2.56c-2.016 0-4 .384-5.856 1.184a15.151 15.151 0 00-4.768 3.232c-1.408 1.376-2.464 2.976-3.232 4.768C1.344 12 .96 13.984.96 16s.384 4 1.184 5.856a15.151 15.151 0 003.232 4.768c1.376 1.408 2.976 2.464 4.768 3.232 1.856.8 3.84 1.184 5.856 1.184s4-.384 5.856-1.184a15.151 15.151 0 004.768-3.232c1.408-1.376 2.464-2.976 3.232-4.768.8-1.856 1.184-3.84 1.184-5.856s-.384-4-1.184-5.856a15.151 15.151 0 00-3.232-4.768c-1.376-1.408-2.976-2.464-4.768-3.232A14.737 14.737 0 0016 .96zm0 7.424c-4.192 0-7.616 3.424-7.616 7.616s3.424 7.616 7.616 7.616 7.616-3.424 7.616-7.616S20.192 8.384 16 8.384z"
    />
  </svg>`;
  }

  /**
   * DO NOT USE EXTERNAL
   */
  buildTaikoSVG() {
    return `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.8em"
      height="0.8em"
      viewBox="0 0 32 32"
    >
      <path
        fill="${this.buildColor()}"
        d="M16 6.4c-5.312 0-9.6 4.288-9.6 9.6s4.288 9.6 9.6 9.6 9.6-4.288 9.6-9.6-4.288-9.6-9.6-9.6zM9.6 16c0-2.976 2.048-5.472 4.8-6.208v12.416c-2.752-.736-4.8-3.232-4.8-6.208zm8 6.208V9.792c2.752.736 4.8 3.232 4.8 6.208s-2.048 5.472-4.8 6.208zM16 3.52c6.88 0 12.48 5.6 12.48 12.48S22.88 28.48 16 28.48c-6.88 0-12.48-5.6-12.48-12.48S9.12 3.52 16 3.52m0-2.56c-2.016 0-4 .384-5.856 1.184a15.151 15.151 0 00-4.768 3.232c-1.408 1.376-2.464 2.976-3.232 4.768C1.344 12 .96 13.984.96 16s.384 4 1.184 5.856a15.151 15.151 0 003.232 4.768c1.376 1.408 2.976 2.464 4.768 3.232 1.856.8 3.84 1.184 5.856 1.184s4-.384 5.856-1.184a15.151 15.151 0 004.768-3.232c1.408-1.376 2.464-2.976 3.232-4.768.8-1.856 1.184-3.84 1.184-5.856s-.384-4-1.184-5.856a15.151 15.151 0 00-3.232-4.768c-1.376-1.408-2.976-2.464-4.768-3.232A14.737 14.737 0 0016 .96z"
      />
    </svg>`;
  }

  /**
   * DO NOT USE EXTERNAL
   */
  buildCatchSVG() {
    return `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.8em"
        height="0.8em"
        viewBox="0 0 32 32"
      >
        <path
          fill="${this.buildColor()}"
          d="M16 3.52c6.88 0 12.48 5.6 12.48 12.48S22.88 28.48 16 28.48c-6.88 0-12.48-5.6-12.48-12.48S9.12 3.52 16 3.52m0-2.56c-2.016 0-4 .384-5.856 1.184a15.151 15.151 0 00-4.768 3.232c-1.408 1.376-2.464 2.976-3.232 4.768C1.344 12 .96 13.984.96 16s.384 4 1.184 5.856a15.151 15.151 0 003.232 4.768c1.376 1.408 2.976 2.464 4.768 3.232 1.856.8 3.84 1.184 5.856 1.184s4-.384 5.856-1.184a15.151 15.151 0 004.768-3.232c1.408-1.376 2.464-2.976 3.232-4.768.8-1.856 1.184-3.84 1.184-5.856s-.384-4-1.184-5.856a15.151 15.151 0 00-3.232-4.768c-1.376-1.408-2.976-2.464-4.768-3.232A14.737 14.737 0 0016 .96zM22.144 16c0-1.312-1.056-2.4-2.4-2.4-1.312 0-2.4 1.088-2.4 2.4s1.088 2.4 2.4 2.4c1.344 0 2.4-1.088 2.4-2.4zm-5.568-4.864c0-1.344-1.088-2.4-2.4-2.4s-2.4 1.056-2.4 2.4 1.056 2.4 2.4 2.4 2.4-1.088 2.4-2.4zm0 9.728c0-1.312-1.088-2.4-2.4-2.4s-2.4 1.088-2.4 2.4 1.056 2.4 2.4 2.4 2.4-1.056 2.4-2.4z"
        />
      </svg>`;
  }

  /**
   * DO NOT USE EXTERNAL
   */
  buildManiaSVG() {
    return `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.8em"
          height="0.8em"
          viewBox="0 0 32 32"
        >
          <path
            fill="${this.buildColor()}"
            d="M16 25.664c-.896 0-1.6-.704-1.6-1.6V7.936c0-.896.704-1.6 1.6-1.6s1.6.704 1.6 1.6v16.128c0 .896-.704 1.6-1.6 1.6zm-3.52-6.144v-7.04c0-.896-.704-1.6-1.6-1.6s-1.6.704-1.6 1.6v7.04c0 .896.704 1.6 1.6 1.6s1.6-.704 1.6-1.6zm10.24 0v-7.04c0-.896-.704-1.6-1.6-1.6s-1.6.704-1.6 1.6v7.04c0 .896.704 1.6 1.6 1.6s1.6-.704 1.6-1.6zM16 3.52C9.12 3.52 3.52 9.12 3.52 16S9.12 28.48 16 28.48c6.88 0 12.48-5.6 12.48-12.48S22.88 3.52 16 3.52m0-2.56c2.016 0 4 .384 5.856 1.184a15.151 15.151 0 014.768 3.232c1.408 1.376 2.464 2.976 3.232 4.768.8 1.856 1.184 3.84 1.184 5.856s-.384 4-1.184 5.856a15.151 15.151 0 01-3.232 4.768c-1.376 1.408-2.976 2.464-4.768 3.232-1.856.8-3.84 1.184-5.856 1.184s-4-.384-5.856-1.184a15.151 15.151 0 01-4.768-3.232c-1.408-1.376-2.464-2.976-3.232-4.768C1.344 20 .96 18.016.96 16s.384-4 1.184-5.856a15.151 15.151 0 013.232-4.768c1.376-1.408 2.976-2.464 4.768-3.232C12 1.344 13.984.96 16 .96z"
          />
        </svg>`;
  }

  getSVG() {
    switch (this.mode) {
      case 0:
        return this.buildStdSVG();
      case 1:
        return this.buildTaikoSVG();
      case 2:
        return this.buildCatchSVG();
      case 3:
        return this.buildManiaSVG();
      default:
        return this.buildStdSVG();
    }
  }
}

class PreviewPlayer {
  beatmapId;
  beatmapTitle;
  beatmapArtist;
  audio = new Audio();

  constructor() {}

  /**
   * @param {Song} song
   */
  setBeatmap(song) {
    this.beatmapId = song.id;
    this.beatmapTitle = song.tite;
    this.beatmapArtist = song.artist;
  }

  /**
   * @param {Number} id
   * @param {String} title
   * @param {String} artist
   */
  handlePreviewClick(id, title, artist) {
    if (id == this.beatmapId) {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.beatmapId = id;
      this.beatmapTitle = TextUtils.decodeText(title);
      this.beatmapArtist = TextUtils.decodeText(artist);

      this.stopCurrentAudio()
      this.refreshAudio();
      this.refreshMetadata();
      this.audio.addEventListener("loadeddata", () => this.audio.play());
    }
  }

  stopCurrentAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = ""
    } 
  }

  toggle() {
    document.querySelector(".previewPlayer").classList.toggle("hidden")
  }

  show() {
    document.querySelector(".previewPlayer").classList.remove("hidden");
  }

  hide() {
    document.querySelector(".previewPlayer").classList.add("hidden");
  }

  setPlayingIcon() {
    document.getElementById("stateButton").classList.remove("fa-pause")
    document.getElementById("stateButton").classList.add("fa-play")
  }

  setPauseIcon() {
    document.getElementById("stateButton").classList.add("fa-pause")
    document.getElementById("stateButton").classList.remove("fa-play")
  }

  refreshAudio() {
    this.audio = new Audio(`https://b.ppy.sh/preview/${this.beatmapId}.mp3`);
    this.audio.volume = 0.5;
  }

  refreshMetadata() {
    document.getElementById("previewPlayerTitle").innerText = decodeURI(this.beatmapTitle);
    document.getElementById("previewPlayerArtist").innerText =
      decodeURI(this.beatmapArtist);
    document.getElementById("previewThumbnail").style.backgroundImage = `url(https://b.ppy.sh/thumb/${this.beatmapId}l.jpg)`;

    this.audio.ontimeupdate = () => {
      document.getElementById("seekFill").style.width = `${
        (this.audio.currentTime / this.audio.duration) * 100
      }%`;
    };

    this.audio.onended = () => {
      this.hide()
    }

    this.audio.onplay = () => {
      this.show()
    }
  }
}
