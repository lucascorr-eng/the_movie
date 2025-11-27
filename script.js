const button = document.querySelector("button")
const buttonClose = document.querySelector("dialog button")
const modal = document.querySelector("dialog")



button.onclick = function () {
  modal.showModal()
}

buttonClose.onclick = function () {
  modal.close()
}



const movie1 = document.querySelector("#item1")

movie1.addEventListener("click", function() {
  modal.showModal()
})


const listMovie = document.querySelector(".container")
const movies = listMovie.querySelectorAll("div")

movies.forEach( movieSelct => {
  movieSelct.addEventListener("click", function(eventet) {
    const movieCLick = event.target;
    console.log("a div clickada foi o", movieCLick.id)

    modal.showModal()
  })
})
