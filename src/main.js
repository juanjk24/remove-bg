import "./css/style.css"

import { readFile } from "./utils/read-file.js"
import "./drop-file.js"

const uploadButton = document.querySelector("#upload-img")

uploadButton.addEventListener("click", () => {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"

  input.click()

  input.onchange = (e) => {
    const file = e.target.files[0]
    readFile({ file })
  }
})
