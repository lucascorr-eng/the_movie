const button = document.querySelector("button")
const buttonClose = document.querySelector("dialog button")
const modal = document.querySelector("dialog")



button.onclick = function () {
  modal.showModal()
}

buttonClose.onclick = function () {
  modal.close()
}

