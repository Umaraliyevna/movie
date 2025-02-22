const movieList = document.getElementById("movie-list");
const videoList = document.getElementById("video-list");
const videoCarusel = document.querySelector(".videos-carusel");
const movieList2 = document.getElementById("movie-list-2");
const textBtn = document.getElementById("text-none");
textBtn.style.color = "#00254d";

const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs",
  },
};

function displayCard(listName) {
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      json.results.forEach((movie) => {
        listName.innerHTML += `
          <div class='card'>
              <img class='card-icon' src='images/icon.svg' alt='icon'>
              <a href='movie.html?movie=${
                movie.id
              }' style='text-decoration:none;'><img id='card-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${
                movie.poster_path
              }' alt="${movie.original_title}"></a>
              <div class="circular-progress">
                  <span class="percentage">${Math.floor(
                    movie.popularity
                  )}<sup style='font-size:8px; color: rgba(255, 255, 255, 0.682);'>%</sup></span>        
              </div>
              <p class='subtitle'>${movie.title}</p>
              <i class='date'>${movie.release_date}</i>
          </div>
        `;
      });
    })
    .catch((err) => console.error(err));
}
displayCard(movieList);

const url2 = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
const options2 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs",
  },
};

function displayCard2(listName) {
  fetch(url2, options2)
    .then((res) => res.json())
    .then((json) => {
      json.results.forEach((movie) => {
        listName.innerHTML += `
            <div class='card'>
               <img class='card-icon' src='images/icon.svg' alt='icon'>
               <img id='card-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${
                 movie.poster_path
               }' alt="${movie.original_title}">
               <div class="circular-progress">
                    <span class="percentage">${Math.floor(
                      movie.popularity
                    )}<sup style='font-size:8px; color: rgba(255, 255, 255, 0.682);'>%</sup></span>        
                </div>
                <p class='subtitle'>${movie.original_name}</p>
                <i class='date'>${movie.first_air_date}</i>
            </div>
            `;
      });
    })
    .catch((err) => console.error(err));
}
displayCard2(movieList2);

function changeBtn(selectedBtn, className) {
  textBtn.style.color = "#a3f7bf";
  const btns = document.querySelectorAll(`.${className}`);
  btns.forEach((button) => {
    button.classList.remove("active");
  });

  selectedBtn.classList.add("active");
}

const url3 =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const options3 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs",
  },
};

function displayVideo() {
  fetch(url3, options3)
    .then((res) => res.json())
    .then((json) => {
      json.results.forEach((video) => {
        videoList.innerHTML += `
                <div class='card-video'>
                   <img class='video-icon' src='images/icon.svg' alt='icon'>
                   <img onmouseover="bigImg(this,'https://media.themoviedb.org/t/p/w220_and_h330_face${video.poster_path}')" onmouseout="normalImg(this)" id='video-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${video.backdrop_path}' alt="${video.original_title}">
                   <div id='player'>
                        <i class='bx bx-play'></i>
                   </div>
                    <p class='subtitle center'>${video.title}</p>
                    <i class='date center'>${video.release_date}</i>
                </div>
            `;
      });
    })
    .catch((err) => console.error(err));
}
displayVideo();

function bigImg(x, url) {
  x.style.transform = "scale(1.1)";
  videoCarusel.style.background = `url(${url})`;
  videoCarusel.style.backgroundSize = "cover";
  videoCarusel.style.backgroundPosition = "center";
}

function normalImg(x) {
  x.style.transform = "scale(1)";
}


