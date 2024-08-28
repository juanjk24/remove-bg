
const app = document.querySelector('#app')

const button = document.querySelector("#upload-img")
const imgPreview = document.querySelector("#img-preview")
const buttonDownload = document.querySelector("#download-img")
let canvas
let fileName

app.addEventListener('dragover', handleDragOverFromDesktop)
app.addEventListener('drop', handleDropFromDesktop)

function handleDragOverFromDesktop(event) {
    event.preventDefault()
    /* const { currentTarget, dataTransfer } = event
  
     if (dataTransfer.types.includes('Files')) {
      } */
  }
  
  function handleDropFromDesktop(event) {
    event.preventDefault()
  
    const { dataTransfer } = event
    const file = dataTransfer.files[0]
    fileName = file.name.split(".")[0]
  
    if (!file) {
      notyf.error('No se ha seleccionado un archivo');
      return
    }
  
    if (dataTransfer.files.length > 1) {
      notyf.error('Solo puedes subir un archivo a la vez');
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

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
            const r = data[i]     // Rojo
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
      // Crear un enlace para descargar la imagen
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `${fileName}.png` // Nombre del archivo de descarga
  
      // Simular un clic en el enlace para iniciar la descarga
      link.click()
    } else {
      //alert("Primero carga una imagen para descargar.")
      return
    }
  })