const result = location.search.split('=')[1];
console.log(result);

var actorsList = document.getElementById('ActorsCast');
const crewContainer = document.getElementById('ActorsCrew');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjM4ZDAzZDkxMzc4YzNlOWM1NDY1NzAyZWE2OGJkZSIsIm5iZiI6MTczOTYxODkwOC4zNzMsInN1YiI6IjY3YjA3YTVjNzBjODg2NWViZDM2MjAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MlFHT_emJmzvLlAGXUx3XBmeVXUuPdu_tUOaKkel_2w',
  },
};

async function getDate(url) {
  try {
    const resDate = await fetch(
      'https://api.themoviedb.org/3/movie/' + url,
      options
    );
    const result = await resDate.json();
    return result;
  } catch (eror) {
    return eror;
  }
}

function getImage(url) {
  return 'https://media.themoviedb.org/t/p/w220_and_h330_face' + url;
}

async function getActors() {
  const actors = await getDate(${result}/credits?language=en-US);

  actors.cast.forEach((actor) => {
    const actorName = actor.name;
    const actorDesc = actor.character + actor.name;
    const actorImage = actor.profile_path;

    actorsList.innerHTML += `

    <div class=EachActors>
    <div class="actorImg">
    <img src="${getImage(actorImage)}">
    </div>
    <div class="ActorInfo">
      <h4>${actorName}</h4>
      <p>${actorDesc}</p>
      </div>
      </div>

    `;
  });
}

async function getCrew() {
  const data = await getDate(`${result}/credits?language=en-US`);

  data.crew.forEach((actors) => {
    const CrewName = actors.name;
    const CrewDesc = Job: ${actors.job};
    const CrewImage = getImage(actors.profile_path);
    console.log(CrewImage);

    crewContainer.innerHTML += `
    <div class="CrewActors">
      <div class="CrewImg">
      <picture>
        <img src="${CrewImage}" onerror="this.onerror=null;this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';" alt="${CrewName}">
      </div>
      <div class="CrewInfo">
        <h4>${CrewName}</h4>
        <p>${CrewDesc}</p>
      </div>
    </div>
    `;
  });
}
const sidebarMenu = document.getElementById('MenuIcom');
const sidebar = document.getElementById('sidebar');
function showSidebar() {
  sidebarMenu.style.display = 'flex';
  sidebar.style.display = 'flex';
}
function hideSidebar() {
  sidebarMenu.style.display = 'flex';
  sidebar.style.display = 'none';
}


getCrew();

getActors();