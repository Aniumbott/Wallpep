const auth = "563492ad6f91700001000001b257a00bb45145858f4ad2df119cf6c1";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// Event Listners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

// images.forEach((img, index) => {
//   img.addEventListener("click", () => {
//     console.log(index);
//   });
// });

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `
    <img class="img" src=${photo.src.large}></img>
    <div class="overlay">
    <a class="photographer" href=${photo.photographer_url}>${photo.photographer}</a>
    <a class = "download" href=${photo.src.large}>Download</a></div>`;
    gallery.appendChild(galleryImage);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
  events();
}

function events() {
  const images = document.querySelectorAll(".img");
  const overlays = document.querySelectorAll(".overlay");
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      overlays[index].classList.toggle("active");
    });
  });
}

async function searchPhotos(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
