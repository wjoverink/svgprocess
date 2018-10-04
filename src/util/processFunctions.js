import randomcolor from 'randomcolor'
import contrast from 'get-contrast'

const processFunctions = {
  randomFill: (element, idArray, vars) => {
    element.setAttribute("style", "fill:" + randomcolor())
  },
  fillMaincolor: (element, idArray, vars) => {
    element.setAttribute("style", "fill:" + vars["mainColor"])
  },
  stroke :  (element, idArray, vars) => {
    element.setAttribute('stroke', randomcolor({
      luminosity: 'light',
      hue: 'blue'
    }))
    element.setAttribute('stroke-width','4')
  },
  palleteColor:  (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    var random = Math.floor((Math.random() * pal.length-1) + 1)
    vars["mainColor"] = pal[random]
    element.setAttribute("style", "fill:" + pal[random])
  },
  palleteColorMaxContrast:  (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    const maxColors = []
   
    for (let index = 0; index < pal.length; index++) {
      var c = contrast.ratio(vars["mainColor"], pal[index])
      if (c>3){
        maxColors.push(pal[index])
      }
    }

    if (!vars["colorPaletteUsed"] || vars["colorPaletteUsed"].length >= maxColors.length){
      vars["colorPaletteUsed"] = []
    }

    for (let index = 0; index < maxColors.length; index++) {
      if (!vars["colorPaletteUsed"].includes(maxColors[index])){
        vars["colorPaletteUsed"].push(maxColors[index])
        element.setAttribute("style", "fill:" + maxColors[index])
        break
      }
    }
  },
  randomFillBlueColors: (element, idArray, vars) => {
    element.setAttribute("style", "fill:" + randomcolor({
      luminosity: 'light',
      hue: 'blue'
   }))
  },
  addText: (element, idArray, vars) => {
    element.textContent = randomcolor()
    element.setAttribute("style", "fill:red")
  },
}

export {
  processFunctions
}