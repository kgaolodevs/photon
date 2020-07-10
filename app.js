const app = {
  auth: "563492ad6f917000010000018b7a2a1d03e34eafb17fc6c055be806e",
  gallery: document.querySelector(".app__gallery"),
  input: document.querySelector(".app__searchForm--search"),
  searchForm: document.querySelector(".app__searchForm"),
  more: document.querySelector(".app__navButton"),
  searchValue: null,
  page: 1,
  fetchLink: null,
  currentSearch: null,
};

const actions = {
  fetchApi: async function (url) {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: app.auth,
      },
    });
    const data = await dataFetch.json();
    return data;
  },

  generatePictures: function (data) {
    data.photos.forEach((photo) => {
      const galleryImage = document.createElement("div");
      galleryImage.classList.add("gallery-image");
      galleryImage.innerHTML = `
      <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original} target="_blank">Download</a>
      </div> 
      <img src=${photo.src.large}>
      `;
      app.gallery.appendChild(galleryImage);
    });
  },

  curatedPhotos: async function () {
    app.fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await actions.fetchApi(app.fetchLink);
    this.generatePictures(data);
  },

  searchPhotos: async function (query) {
    this.clear();
    app.fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await actions.fetchApi(app.fetchLink);
    this.generatePictures(data);
  },

  updateInput: function (e) {
    app.searchValue = e.target.value;
  },

  clear: function () {
    app.gallery.innerHTML = "";
    app.input.value = "";
  },

  loadMore: async function () {
    app.page++;
    if (app.currentSearch) {
      app.fetchLink = `https://api.pexels.com/v1/search?query=${app.currentSearch}&per_page=15&page=${app.page}`;
    } else {
      app.fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${app.page}`;
    }
    const data = await actions.fetchApi(app.fetchLink);
    actions.generatePictures(data);
  },
};

actions.curatedPhotos();

// Event listeners
app.input.addEventListener("input", actions.updateInput);
app.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  app.currentSearch = app.searchValue;
  actions.searchPhotos(app.input.value);
});
app.more.addEventListener("click", actions.loadMore);
