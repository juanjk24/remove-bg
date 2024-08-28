const imgPreview = document.querySelector("#img-preview")
const buttonDownload = document.querySelector("#download-img")

let canvas
let fileName

export function readFile({ file }) {

  if (!file) {
    alert("No se ha seleccionado un archivo")
    return
  }

  if (!file.type.startsWith("image/")) {
    alert("El archivo seleccionado no es una imagen")
    return
  }
  
  imgPreview.innerHTML = ""
  const reader = new FileReader()
  reader.readAsDataURL(file)

  fileName = file.name.split(".")[0]

  reader.onload = () => {
    const img = new Image()
    img.src = reader.result
    img.onload = () => {
      canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      // Configura el tamaño del canvas al tamaño de la imagen
      canvas.width = img.width
      canvas.height = img.height

      // Dibuja la imagen en el canvas
      ctx.drawImage(img, 0, 0)

      // Obtén la data de los píxeles de la imagen
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Recorrer cada píxel y hacer transparente el color que deseas eliminar
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] // Rojo
        const g = data[i + 1] // Verde
        const b = data[i + 2] // Azul

        // Aquí se define el color que se eliminará (fondo blanco, en este caso)
        if (r > 240 && g > 240 && b > 240) {
          // Si el píxel es blanco, lo hacemos transparente
          data[i + 3] = 0 // Alpha a 0 (transparente)
        }
      }

      // Colocar la data de nuevo en el canvas
      ctx.putImageData(imageData, 0, 0)

      // Convertir el canvas en una imagen y añadirla al DOM
      const imgElement = document.createElement("img")
      imgElement.src = canvas.toDataURL("image/png")
      imgPreview.appendChild(imgElement)
    }

    buttonDownload.style.display = "flex"
  }
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
