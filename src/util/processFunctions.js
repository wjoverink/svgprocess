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
  palleteColorNotUsed:  (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    
    if (!vars["lastUsedColors"]){
      vars["lastUsedColors"]=[]
    }
    
    const lastUColorlength= vars["lastUsedColors"].length
    if (lastUColorlength===pal.length){
      vars["lastUsedColors"].length = 0
    }
    var random = Math.floor((Math.random() * pal.length-1) + 1)
    while (vars["lastUsedColors"].includes(pal[random]) && 
      pal.length>1 && 
      lastUColorlength<pal.length) {
        random = Math.floor((Math.random() * pal.length-1) + 1)
    }
    vars["lastUsedColors"].push(pal[random])
    element.setAttribute("style", "fill:" + pal[random])
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
  colorMaxContrast:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.3, vars["lastUsedColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["lastUsedColor"] = newColor
  },
  colorMaxContrastMain:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.2, vars["mainColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["lastUsedColor"] = newColor
  },
  colorMaxContrastMainSecondary:  (element, idArray, vars) => {
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