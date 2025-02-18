const information = document.getElementById("information");
const movieInfo = document.getElementById('movie-info');
const actorsCard = document.getElementById('actors-card');
const popularVideo = document.getElementById('popular-video');

const id=location.search.split('=')[1];

const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
};

  
function displayInfo() {

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        information.innerHTML += `
        <img id='movie-info-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${json.poster_path}' alt='${json.original_title}'>
        <div class='img-info'>
            <h1 class='movie-name'>${json.original_title}<span class='year'>(${json.release_date.split('-')[0]})</span></h1>
            <div class='flex paddingLeft info-four'>                
                <div id='ceritification' class='certification white'></div>
                <p class='date white'>${json.release_date}</p>
                <div class='dot'></div>
                <p class='continuity white'>${Math.floor(json.runtime/60)}h ${json.runtime-60*Math.floor(json.runtime/60)}min</p>
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
        data.results.forEach((res)=>{
            if(res.iso_3166_1===json.production_countries[0].iso_3166_1){
                var certificat = document.createElement('p');
                certificat.textContent = res.release_dates[0].certification;
                var ceritification = document.getElementById('ceritification');
                ceritification.appendChild(certificat);
            }
        })
    });

    movieInfo.style.backgroundImage  = `url('https://media.themoviedb.org/t/p/w220_and_h330_face${json.poster_path}')`
    })
    .catch(err => console.error(err));
}

displayInfo();


function displayActorsCard(){
    var count = 0;
    let isExecuted = false;
    const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const options2 = {
      method: 'GET',
      headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
    };
    
    fetch(url2, options2)
      .then(res => res.json())
      .then(json => {
        console.log(json.cast);
        json.cast.forEach((actor)=>{
            count++;
            if(count<10){
                if(actor.profile_path){
                    actorsCard.innerHTML += `
                        <div>
                            <img class='actor-img' src='https://media.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}'>
                            <h2 class='actor-name'>${actor.original_name !=null? actor.original_name:actor.name }</h2>
                            <p class='character'>${actor.character}</p>
                        </div>
                    `
                }else if(actor.gender ===1){
                    actorsCard.innerHTML += `
                        <div>
                            <img src='images/actors/woman.svg'>
                            <h2 class='actor-name'>${actor.original_name !=null? actor.original_name:actor.name }</h2>
                            <p>${actor.character}</p>
                        </div>
                    `
                }else{
                    actorsCard.innerHTML += `
                        <div>
                            <img class='actor-img' src='images/actors/man.svg'>
                            <h2 class='actor-name'>${actor.original_name !=null? actor.original_name:actor.name }</h2>
                            <p class='character'>${actor.character}</p>
                        </div>
                    `
                }
            }else if (!isExecuted){
                actorsCard.innerHTML += `
                    <a class='again'>Смотреть ещё</a>
                    <i id='right' class='bx bx-right-arrow-alt'></i>
                `
                isExecuted = true;
                count--;
            }
           
        })
      })
      .catch(err => console.error(err));
}
displayActorsCard();
const comment = document.getElementById('comment');
const discuss = document.getElementById('discussion').style.display = 'none';
function socialMedia(selectedA, className) {
    const a = document.querySelectorAll(`.${className}`);
    a.forEach((teg) => {
      teg.classList.remove("active");
      if(teg.classList.includes('discussion')){
        discuss.style.display = 'none';
      }else{
        comment.style.display='none';
      }
    });
  
    selectedA.classList.add("active");
    if(selectedA.classList.includes('active') && selectedA.classList.includes('discussion')){
        discuss.style.display = 'block';
    }else{
        comment.style.display='block';
    }   

}

const url3 = `https://api.themoviedb.org/3/movie/${id}/images`;
const options3 = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
};

fetch(url3, options3)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        json.backdrops.forEach((item)=>{
            popularVideo.innerHTML +=`
                <img src='https://media.themoviedb.org/t/p/w220_and_h330_face${item.file_path}'>
            `
        })
        
    })

    // const url4 = `https://api.themoviedb.org/3/movie/${id}/video/play?language=en-US`;
    // const options4 = {
    //   method: 'GET',
    //   headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkYmRiNTcyM2RiNjk1MzEyZjYwZTJhYWJjZjJjZCIsIm5iZiI6MTczOTAxOTQyMi40Njg5OTk5LCJzdWIiOiI2N2E3NTQ5ZTVmYTQyZDdlNzZmMTEwMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ER1dWCes98jF_MVpkt-WMwCKPFe3A41DWqGy1NGQ6gs'}
    // };
    
    // fetch(url3, options3)
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log(json)
            
    //     })