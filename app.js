const app = {
  auth: "563492ad6f917000010000018b7a2a1d03e34eafb17fc6c055be806e",
  gallery: document.querySelector(".app__gallery"),
  input: document.querySelector(".app__searchForm--search"),
  searchForm: document.querySelector(".app__searchForm"),
  searchValue: null,
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
      <img src=${photo.src.large}> 
      <p>${photo.photographer}</p>
      `;
      app.gallery.appendChild(galleryImage);
    });
  },

  curatedPhotos: async function () {
    const data = await this.fetchApi(
      "https://api.pexels.com/v1/curated?per_page=15"
    );
    this.generatePictures(data);
  },

  searchPhotos: async function (query) {
    const data = await actions.fetchApi(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15`
    );
    this.generatePictures(data);
  },

  updateInput: function (e) {
    app.searchValue = e.target.value;
  },
};

actions.curatedPhotos();

// Event listeners
app.input.addEventListener("input", actions.updateInput);
app.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  actions.searchPhotos(app.input.value);
});
