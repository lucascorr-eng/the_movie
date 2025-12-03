// variable decaration

const modal = document.querySelector("dialog");  //dialog 
const buttonClose = document.querySelector("dialog button"); //button close dialog
const listMovie = document.querySelector(".container"); //div father - box
const cards = listMovie.querySelectorAll(".content-wrapper"); //div son - list of the cards
const inputSearch = document.querySelector("#search"); //input type text



// open div clicked

cards.forEach( movieSelct => {
  movieSelct.addEventListener("click", function(eventet) {
    const movieCLick = event.target;
    console.log("a div clickada foi o", movieCLick.id);

    modal.showModal();
  })
})



// close dialog

buttonClose.onclick = function () {
  modal.close();
}

// search - input type text

inputSearch.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const query = inputSearch.value.trim(); //store search

    console.log("A busca foi", query); //show the search

    if (!query) return; //empty, nothing happens

    try {
      const result = await searchSeries(query); //async function that calls api
      renderMovies(result)
    } catch (error) {
      console.log(error); //show message on screen
    }
  }
})


// async function that makes the request

async function searchSeries(query) {
  const urlApi = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;  //store search results + api

  const response = await fetch(urlApi); //request api fuction

  if (!response.ok) {
    throw new Error("Erro ao buscas séries.")
  }

  const data = await response.json(); //transform search in object
  console.log("json simples", data)

  const results = data.map(item => { //manipulate the array
    const show = item.show;

    return {
      title: show.name,
      poster: show.image?.medium,
      rating: show.rating?.average,
      year: show.premiered?.slice(0,4),
      genres: show.genres.join(", "),
      summary: show.summary,
    }
  })

  console.log("a busca com o array modificado", results)

  return results;
}


// function that modify cards

function renderMovies (moviesData) {
  const maxCards = cards.length;
  const selected = moviesData.slice(0, maxCards)

  cards.forEach ((cards, index) => {
    const movie = selected[index];

    if(!movie) {
      cards.style.display = "none"
      return;
    }

    cards.style.display = "block";

    const titleEl = cards.querySelector(".content p");
    const ratingEl = cards.querySelector(".note span");
    const yearEl = cards.querySelector(".year");

    titleEl.textContent  = movie.title ?? "Sem título";
    ratingEl.textContent = movie.rating ?? "0.0";
    yearEl.textContent   = movie.year ?? "—";

    if (movie.poster) {
      cards.style.backgroundImage = `url(${movie.poster})`;
      cards.style.backgroundSize = "cover"
      cards.style.backgroundPosition = "center"
    }

    else {
      cards.style.backgroundImage = "none";
    }
  });
}