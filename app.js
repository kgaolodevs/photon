const app = {
  auth: "563492ad6f917000010000018b7a2a1d03e34eafb17fc6c055be806e",
  gallery: document.querySelector(".app__gallery"),
  input: document.querySelector(".app__searchForm--search"),
  submitButton: document.querySelector(".app__searchForm--submitButton"),
  seachValue: null,
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
};

actions.curatedPhotos();

// Event listeners
app.submitButton.addEventListener("click", actions.curatedPhotos);
