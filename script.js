// variable decaration

const modal = document.querySelector("dialog");  //dialog 
const buttonClose = document.querySelector("dialog button"); //button close dialog
const listMovie = document.querySelector(".container"); //div father - box
const movies = listMovie.querySelectorAll("div"); //div son - list of the movies
const inputSearch = document.querySelector("#search"); //input type text



// open div clicked

movies.forEach( movieSelct => {
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
}