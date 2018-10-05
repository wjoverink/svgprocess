import randomcolor from 'randomcolor'
import contrast from 'get-contrast'

const processFunctions = {
  randomFill: (element, idArray, vars) => {
    let a = randomcolor()
    vars["mainColor"] = a
    element.setAttribute("style", "fill:" + a)
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
  colorMaxContrast:  (element, idArray, vars) => {
    for (let index = 0; index < 30; index++) {
      const pal =  vars["colorPalette"]
      var b = pal[Math.floor((Math.random() * pal.length-1) + 1)]
      var c = contrast.ratio(vars["mainColor"], b)
      if (c>1.4){

        element.setAttribute("style", "fill:" + b)
        vars["secondaryColor"] = b
        break
      }
    }
  },
  colorMaxContrastSecondary:  (element, idArray, vars) => {
    for (let index = 0; index < 30; index++) {
      const pal =  vars["colorPalette"]
      var b = pal[Math.floor((Math.random() * pal.length-1) + 1)]
      var c = contrast.ratio(vars["secondaryColor"], b)
      var e = contrast.ratio(vars["mainColor"], b)
      if (c>2 && e>1.4){

        element.setAttribute("style", "fill:" + b)
        break
      }
    }
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