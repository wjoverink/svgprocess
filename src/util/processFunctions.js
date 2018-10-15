import contrast from 'get-contrast'

const processFunctions = {
  palleteColor:  (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    var random = Math.floor((Math.random() * pal.length-1) + 1)
    while (vars["lastUsedColor"] === pal[random] && pal.length>1) {
      random = Math.floor((Math.random() * pal.length-1) + 1)
    }
    vars["lastUsedColor"] = pal[random]
    element.setAttribute("style", "fill:" + pal[random])
  },
  palleteColorNotUsed:  (element, idArray, vars, index) => {
    const pal =  vars["colorPalette"]
    
    if (!vars["autoUsedColors"]){
      vars["autoUsedColors"]=[]
    }
    
    const lastUColorlength= vars["autoUsedColors"].length
    if (lastUColorlength===pal.length){
      vars["autoUsedColors"].length = 0
    }
    let random = Math.floor((Math.random() * pal.length-1) + 1)
    let breakCounter = 0
    let lastColor = vars["autoUsedColors"][lastUColorlength-1] || "#FFFFFF"
    while ((vars["autoUsedColors"].includes(pal[random]) || 
      (contrast.ratio(lastColor, pal[random]) < 1.4)) &&
      pal.length>1 && 
      breakCounter < pal.length*3 &&
      lastUColorlength<pal.length) {
        random = Math.floor((Math.random() * pal.length-1) + 1)
        breakCounter++
    }
    let newColor = pal[random]
    if (breakCounter>=pal.length*3){
      const pal =  vars["colorPalette"]
      random = Math.floor((Math.random() * pal.length-1) + 1)
      let newbreakcounter = 0
      while (newbreakcounter < pal.length && (vars["autoUsedColors"].includes(pal[random]))) {
        random = Math.floor((Math.random() * pal.length-1) + 1)
        newbreakcounter++
      }
      newColor = pal[random]
      if (newbreakcounter>=pal.length){
        newColor = "#FFFFFF"
      }
    }
    vars["autoUsedColors"].push(newColor)
    vars["usedColors"].push(newColor)
    if (vars["allChildren"].length-1 === index && !vars["usedColors"].includes(vars["mainColor"])){
      random = Math.floor((Math.random() * vars["allChildren"].length-1) + 1)
      vars["allChildren"][random].setAttribute("style", "fill:" + vars["mainColor"])
    }
    element.setAttribute("style", "fill:" + newColor)
  },
  isMainColor: (element, idArray, vars) => {
    vars["mainColor"] =  vars["lastUsedColor"]
  },
  mainColor: (element, idArray, vars) => {
    vars["lastUsedColor"] = vars["mainColor"]
    element.setAttribute("style", "fill:" + vars["mainColor"])
  },
  isSecondaryColor: (element, idArray, vars) => {
    vars["secondaryColor"] =  vars["lastUsedColor"]
  },
  dontTouch: (element, idArray, vars) => {

  },
  uniqueColor: (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    var random = Math.floor((Math.random() * pal.length-1) + 1)
    while ((vars["mainColor"] === pal[random] || vars["secondaryColor"] === pal[random]) && pal.length>2) {
      random = Math.floor((Math.random() * pal.length-1) + 1)
    }
    vars["lastUsedColor"] = pal[random]
    element.setAttribute("style", "fill:" + pal[random])
  },
  secondaryColor: (element, idArray, vars) => {
    vars["lastUsedColor"] = vars["secondaryColor"]
    element.setAttribute("style", "fill:" + vars["secondaryColor"])
  },
  lastUsedColor: (element, idArray, vars) => {
    element.setAttribute("style", "fill:" + vars["lastUsedColor"])
  },
  colorContrast:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.3, vars["lastUsedColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["lastUsedColor"] = newColor
  },
  colorContrastMain:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.2, vars["mainColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["lastUsedColor"] = newColor
  },
  colorContrastMainSecondary:  (element, idArray, vars) => {
      const pal =  vars["colorPalette"]
      const posColors = []
      for (let index = 0; index < pal.length; index++) {
        var b = pal[index]
        var c = contrast.ratio(vars["secondaryColor"], b)
        var e = contrast.ratio(vars["mainColor"], b)
        if (c>1.2 && e>1.2){
          posColors.push(b)
        }
      }
      const random = Math.floor((Math.random() * posColors.length-1) + 1)
      const newColor = posColors[random]
      element.setAttribute("style", "fill:" + newColor)
      vars["lastUsedColor"] = newColor
  },
}

const randomColorWithContrast= (contastRatio, contrastColor, palette) => {
  const pal =  palette
  const posColors = []
  for (let index = 0; index < pal.length; index++) {
    var b = pal[index]
    var c = contrast.ratio(contrastColor, b)
    if (c>contastRatio){
      posColors.push(b)
    }
  }
  const random = Math.floor((Math.random() * posColors.length-1) + 1)
  return posColors[random]
}

export {
  processFunctions
}