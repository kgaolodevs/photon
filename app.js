const app = {
  auth: "563492ad6f917000010000018b7a2a1d03e34eafb17fc6c055be806e",
  gallery: document.querySelector(".app__gallery"),
  input: document.querySelector(".app__searchForm--search"),
  searchForm: document.querySelector(".app__searchForm"),
  searchValue: null,
};

const actions = {
  curatedPhotos: async function () {
    const dataFetch = await fetch(
      "https://api.pexels.com/v1/curated?per_page=15",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: app.auth,
        },
      }
    );
    const data = await dataFetch.json();
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

  searchPhotos: async function (query) {
    const dataFetch = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: app.auth,
        },
      }
    );
    const data = await dataFetch.json();
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
