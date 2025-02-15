const information = document.getElementById("information");
const movieInfo = document.getElementById('movie-info');
const id=location.search.split('=')[1];
console.log(id);

const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
};

  
function displayInfo() {
    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        information.innerHTML += `
        <img id='movie-info-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${json.poster_path}' alt='${json.original_title}'>
        <div class='img-info'>
            <h1 class='movie-name'>${json.original_title}<span class='year'>(${json.release_date.split('-')[0]})</span></h1>
            <div class='flex paddingLeft info-four'>                
                <div id='ceritification' class='certification white'></div>
                <p class='date white'>${json.release_date}</p>
                <div class='dot'></div>
                <p class='continuity white'>${Math.floor(json.runtime/60)}h${json.runtime-60*Math.floor(json.runtime/60)}</p>
            </div>
            <div class='flex paddingLeft info-three'>
                <div class="circular-progress rating">
                    <span class="percentage" style='font-size: 22px;'>${json.vote_count}<sup style='font-size:8px; color: rgba(255, 255, 255, 0.682);'>%</sup></span>        
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
            <div class='obzor'>
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
    const url2 = `https://api.themoviedb.org/3/movie/${id}/release_dates?language=en-US`;
    const options2 = {
        method: 'GET',
        headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
    };
    
    fetch(url2,options2)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.results.forEach((res)=>{
            if(res.iso_3166_1===json.production_countries[0].iso_3166_1){
                var certificat = document.createElement('p');
                certificat.textContent = res.release_dates[0].certification;
                var ceritification = document.getElementById('ceritification');
                ceritification.appendChild(certificat);
                console.log(ceritification)
            }
        })

          let gbCertification = data.results.find(r => r.iso_3166_1 === "GB");
          let usCertification = data.results.find(r => r.iso_3166_1 === "US");
    
          console.log("UK Rating:", gbCertification.release_dates[0].certification); // "15"
          console.log("US Rating:", usCertification.release_dates[0].certification); // "R"
    });

    movieInfo.style.backgroundImage  = `linear-gradient(to right, rgba(199.5, 220.5, 241.5, 1) calc((50vw - 170px) - 340px), rgba(199.5, 220.5, 241.5, 0.84) 50%, rgba(199.5, 220.5, 241.5, 0.84) 100%)`
    })
    .catch(err => console.error(err));
}

displayInfo();

