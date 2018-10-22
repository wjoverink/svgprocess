import contrast from 'get-contrast'
import { find, last } from 'lodash'

const processFunctions = {
  palleteColor:  (element, idArray, vars) => {
    const pal =  vars["colorPalette"]
    var random = Math.floor((Math.random() * pal.length-1) + 1)
    while (last(vars["usedColors"]) === pal[random] && pal.length>1) {
      random = Math.floor((Math.random() * pal.length-1) + 1)
    }
    vars["usedColors"].push(pal[random])
    element.setAttribute("style", "fill:" + pal[random])
   
  },
  palleteColorNotUsed:  (element, idArray, vars, index) => {
    const pal =  vars["colorPalette"]
    
    if (!vars["autoUsedColors"]){
      vars["autoUsedColors"]=[]
    }
    if (!vars["parentElements"]){
      vars["parentElements"]=[]
    }
    let parentElement
    //parentElement
    if (element.parentElement.nodeName === 'g'){
      parentElement = find(vars["parentElements"], {parent:element.parentElement});
      if (!parentElement){
        parentElement = {parent:element.parentElement, color:undefined}
        vars["parentElements"].push(parentElement)
      } else {
        element.setAttribute("style", "fill:" + parentElement.color)
        return
      }
    }
    
    const lastUColorlength= vars["autoUsedColors"].length
    if (lastUColorlength===pal.length){
      vars["autoUsedColors"].length = 0
    }
    let random = Math.floor((Math.random() * pal.length-1) + 1)
    let breakCounter = 0
    let lastColor = vars["autoUsedColors"][lastUColorlength-1] || "#FFFFFF"
    while ((vars["autoUsedColors"].includes(pal[random]) || 
      (contrast.ratio(lastColor, pal[random]) < 2)) &&
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
    if (parentElement){
      parentElement.color = newColor
    }
    element.setAttribute("style", "fill:" + newColor)
  },
  isMainColor: (element, idArray, vars) => {
    vars["mainColor"] =  last(vars["usedColors"])
  },
  mainColor: (element, idArray, vars) => {
    vars["usedColors"].push(vars["mainColor"])
    element.setAttribute("style", "fill:" + vars["mainColor"])
  },
  isSecondaryColor: (element, idArray, vars) => {
    vars["secondaryColor"] = last(vars["usedColors"])
  },
  dontTouch: (element, idArray, vars) => {

  },
  secondaryColor: (element, idArray, vars) => {
    vars["usedColors"].push(vars["secondaryColor"])
    element.setAttribute("style", "fill:" + vars["secondaryColor"])
  },
  lastUsedColor: (element, idArray, vars) => {
    element.setAttribute("style", "fill:" + last(vars["usedColors"]))
  },
  colorContrast:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.3, last(vars["usedColors"]), vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["usedColors"].push(newColor)
  },
  colorContrastMain:  (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.2, vars["mainColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["usedColors"].push(newColor)
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
      vars["usedColors"].push(newColor)
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