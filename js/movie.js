const information = document.getElementById("information");
const movieInfo = document.getElementById("movie-info");
const actorsCard = document.getElementById("actors-card");
const popularVideo = document.getElementById("popular-video");
const recommendMovies = document.getElementById("recommend_movies");
const statusInfo = document.getElementById("status_info");
const keywords = document.getElementById("keywords");
const rec_video = document.getElementById("rec_video");

const id = location.search.split("=")[1];
const commonUrl = "https://api.themoviedb.org/3/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs",
  },
};
const imgUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face";

function displayInfo() {
  const url = `${commonUrl}movie/${id}?language=en-US`;
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      information.innerHTML += `
        <div>
            <img id='movie-info-img' src='${imgUrl}${json.poster_path}' alt='${
        json.original_title
      }'>
        </div>
        <div class='img-info'>
            <h1 class='movie-name paddingLeft'>${
              json.original_title
            }<span class='year'>(${json.release_date.split("-")[0]})</span></h1>
            <div class='flex paddingLeft info-four'>                
                <div id='ceritification' class='certification white'></div>
                <p class='date white'>${json.release_date}</p>
                <div class='dot'></div>
                <p class='continuity white'>${Math.floor(json.runtime / 60)}h ${
        json.runtime - 60 * Math.floor(json.runtime / 60)
      }min</p>
            </div>
            <div class='flex paddingLeft info-three'>
                <div class="circular-progress rating">
                    <span class="percentage">${
                      json.vote_count
                    }<sup style='font-size:8px; color: rgba(255, 255, 255, 0.682);'>%</sup></span>        
                </div>
                <p class='reyting white'>Рейтинг</p>
                <button class='button flex'>What's your <a class='link'>Vibe</a>?<div class='i'>i</div></button>
            </div>
            <div class='flex buttons paddingLeft'>
                <div class='add-info'><i class='bx bx-menu'></i></div>
                <div class='add-info'><i class='bx bxs-heart'></i></div>
                <div class='add-info'><i class='bx bxs-bookmark-minus'></i></div>
                <div class='info-treiler'>
                    <i id='info-player' class='bx bx-play' ></i>
                    <p>Воспроизвести трейлер</p>
                </div>
            </div>
            <div class='obzor paddingLeft'>
                <i>«Войдите в Дивный Новый Мир»</i>
                <h2 class='white'>Обзор</h2>
                <p class='obzor-text white'>${json.overview}</p>
            </div>
            <div class='paddingLeft'>
                <h2 class='person'></h2>
                <p class='role'></p>
            </div>

        </div>
    `;
      const url2 = `${commonUrl}movie/${id}/release_dates?language=en-US`;

      fetch(url2, options)
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((res) => {
            if (res.iso_3166_1 === json.production_countries[0].iso_3166_1) {
              var certificat = document.createElement("p");
              certificat.textContent = res.release_dates[0].certification;
              var ceritification = document.getElementById("ceritification");
              ceritification.appendChild(certificat);
            }
          });
        });

      movieInfo.style.backgroundImage = `url('${imgUrl}${json.poster_path}')`;
    })
    .catch((err) => console.error(err));
}

displayInfo();

function displayActorsCard() {
  var count = 0;
  let isExecuted = false;
  const url = `${commonUrl}movie/${id}/credits?language=en-US`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.cast);
      json.cast.forEach((actor) => {
        count++;
        if (count < 10) {
          if (actor.profile_path) {
            actorsCard.innerHTML += `
                        <div>
                            <img class='actor-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${
                              actor.profile_path
                            }'>
                            <h2 class='actor-name'>${
                              actor.original_name != null
                                ? actor.original_name
                                : actor.name
                            }</h2>
                            <p class='character'>${actor.character}</p>
                        </div>
                    `;
          } else if (actor.gender === 1) {
            actorsCard.innerHTML += `
                        <div>
                            <img src='images/actors/woman.svg'>
                            <h2 class='actor-name'>${
                              actor.original_name != null
                                ? actor.original_name
                                : actor.name
                            }</h2>
                            <p>${actor.character}</p>
                        </div>
                    `;
          } else {
            actorsCard.innerHTML += `
                        <div>
                            <img class='actor-img' src='images/actors/man.svg'>
                            <h2 class='actor-name'>${
                              actor.original_name != null
                                ? actor.original_name
                                : actor.name
                            }</h2>
                            <p class='character'>${actor.character}</p>
                        </div>
                    `;
          }
        } else if (!isExecuted) {
          actorsCard.innerHTML += `
                    <a class='again'>Смотреть ещё</a>
                    <i id='right' class='bx bx-right-arrow-alt'></i>
                `;
          isExecuted = true;
          count--;
        }
      });
    })
    .catch((err) => console.error(err));
}
displayActorsCard();
const comment = document.getElementById("comment");
const discuss = document.getElementById("discussion");
discuss.style.display = "none";

var a = {
  comment: "discussion",
  discussion: "comment",
};

function socialMedia(selectedA, contentId) {
  selectedA.classList.toggle("active");
  const foundContent = document.getElementById(contentId + "Content");
  const foundOpposit = document.getElementById(a[contentId]);
  const foundOppositContent = document.getElementById(a[contentId] + "Content");
  console.log(foundOpposit, foundContent);

  foundOpposit.classList.remove("active");
  foundOppositContent.classList.remove("active");
  foundContent.classList.add("active");
}

function displayPopularVideos() {
  const url = `${commonUrl}movie/${id}/images`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      json.backdrops.forEach((item) => {
        popularVideo.innerHTML += `
                    <img class='fame_video' src='${imgUrl}${item.file_path}'>
                `;
      });
    })
    .catch((err) => console.error(err));
}
displayPopularVideos();

function displayRecommend() {
  const url = `${commonUrl}movie/${id}/recommendations?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      json.results.forEach((movie) => {
        recommendMovies.innerHTML += `
                    <div class='recommend_card'>
                        <img src='${imgUrl}${movie.backdrop_path}' alt='${
          movie.original_title
        }'>
                        <div class="recommend_overflow">
                          <div>
                            <i class='bx bx-calendar'></i>
                            <p class="recommend_date">${movie.release_date.replace(
                              /-/g,
                              "/"
                            )}</p>
                          </div>
                          <div>
                            <i class='bx bxs-star' ></i>
                            <i class='bx bxs-heart' ></i>
                            <i class='bx bxs-bookmark' ></i>
                          </div>
                        </div>
                        <div class='recommend_name'>
                            <p>${movie.original_title}</p>
                            <p>${Math.round(movie.vote_average * 10)}%</p>
                        </div>
                    </div>
                `;
      });
    })
    .catch((err) => console.error(err));
}
displayRecommend();

function displayStatus() {
  const url1 = `${commonUrl}/movie/${id}?language=en-US`;

  fetch(url1, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      statusInfo.innerHTML += `
            <div class='status_blok'>
                <div>
                    <h3>Status</h3>
                    <p>${json.status}</p>
                </div>
                <div>
                    <h3>Original language</h3>
                    <p>${json.spoken_languages[0].name}</p>
                </div>
            </div>
            <div class='status_blok'>
                <div>
                    <h3>Budget</h3>
                    <p>$${json.budget}</p>
                </div>
                <div>
                    <h3>Revenue</h3>
                    <p>$${json.revenue}</p>
                </div>
            </div>
        `;
    })
    .catch((err) => console.error(err));

  const url2 = `${commonUrl}movie/${id}/keywords`;
  fetch(url2, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      json.keywords.forEach((key) => {
        keywords.innerHTML += `
                <button class='key_btn'>${key.name}</button>
            `;
      });
    })
    .catch((err) => console.error(err));
}
displayStatus();

function displyVideo() {
  const url3 = `${commonUrl}movie/${id}/videos?api_key=YOUR_API_KEY`;
  fetch(url3)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      json.results.forEach((movie) => {
        rec_video.innerHTML += `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie.key}" frameborder="0" ></iframe>
            `;
      });
    })
    .catch((err) => console.error(err));
}

displyVideo();
