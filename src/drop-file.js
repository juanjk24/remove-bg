import { readFile } from "./utils/read-file.js"

const app = document.querySelector("#app")
const buttonDownload = document.querySelector("#download-img")
const imgPreview = document.querySelector("#img-preview")

let canvas
let fileName

app.addEventListener("dragover", handleDragOverFromDesktop)
app.addEventListener("drop", handleDropFromDesktop)
app.addEventListener("dragleave", handleDragLeaveFromDesktop)

function handleDragOverFromDesktop(event) {
  event.preventDefault()
  const { dataTransfer } = event
  
  if (dataTransfer.types.includes('Files')) {
    document.body.classList.add("dragover")
    imgPreview.classList.add("dragover")
  }
}

function handleDragLeaveFromDesktop(event) {
  event.preventDefault()

  document.body.classList.remove("dragover")
  imgPreview.classList.remove("dragover")
}

function handleDropFromDesktop(event) {
  event.preventDefault()

  document.body.classList.remove("dragover")
  imgPreview.classList.remove("dragover")

  const { dataTransfer } = event
  const file = dataTransfer.files[0]

  if (!file) {
    alert("No se ha seleccionado un archivo")
    return
  }

  if (dataTransfer.files.length > 1) {
    alert("Solo puedes subir un archivo a la vez")
    return
  }

  if (!file.type.startsWith("image/")) {
    alert("El archivo seleccionado no es una imagen")
    return
    
  }

  readFile({ file })
}

buttonDownload.addEventListener("click", () => {
  if (canvas) {
    
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `${fileName}.png` 

    link.click()
  } else {
    return
  }
})
