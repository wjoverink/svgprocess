import contrast from 'get-contrast'
import { find, last, first, difference } from 'lodash'
import shuffle from 'shuffle-array'

const processFunctions = {
  palleteColor: (element, idArray, vars) => {
    const pal = vars["colorPalette"]
    var random = Math.floor((Math.random() * pal.length - 1) + 1)
    while (last(vars["usedColors"]) === pal[random] && pal.length > 1) {
      random = Math.floor((Math.random() * pal.length - 1) + 1)
    }
    vars["usedColors"].push(pal[random])
    element.setAttribute("style", "fill:" + pal[random])

  },
  palleteColorNotUsed: (element, idArray, vars, index) => {
    const pal = shuffle(vars["colorPalette"], { 'copy': true })

    if (!vars["autoUsedColors"]) {
      vars["autoUsedColors"] = []
    }
    if (!vars["parentElements"]) {
      vars["parentElements"] = []
    }

    let parentElement
    //parentElement
    if (element.parentElement.nodeName === 'g') {
      parentElement = find(vars["parentElements"], { parent: element.parentElement });
      if (!parentElement) {
        parentElement = { parent: element.parentElement, color: undefined }
        vars["parentElements"].push(parentElement)
      } else {
        element.setAttribute("style", "fill:" + parentElement.color)
        return
      }
    }
    console.log(element)
    //[{control:child,color:undefined,enclosed:[], intersection:[]}]
    const collisionsColors = vars["collisions"]
    let newColor = undefined
    const collision = collisionsColors[index]
    if (collision.enclosed.length === 0 && collision.intersection.length === 0){
      newColor = first(difference(pal, vars["autoUsedColors"]))
      if (!newColor){
        vars["autoUsedColors"] = []
        newColor = first(difference(pal, [last(vars["usedColors"])]))
      }
    } else {
      newColor = findBestColorsForCollision(collisionsColors, collision, pal)
      if (newColor === null){
        const usedColors = [last(vars["usedColors"])]
        const autoUsedColors = [...vars["autoUsedColors"]]
        const encl = find(collisionsColors, {control:last(collision.enclosed)})
        if (encl && encl.color){
          usedColors.push(encl.color)
          autoUsedColors.push(encl.color)
        }
        newColor = first(difference(pal, autoUsedColors))
        if (!newColor){
          vars["autoUsedColors"] = []
          newColor = first(difference(pal, usedColors))
        }

      }

    }
    if (!newColor){
      newColor = "white"
    }
    vars["usedColors"].push(newColor)
    vars["autoUsedColors"].push(newColor)
    collision.color = newColor

    // const colParent = find(vars["collisions"], element)
    // if (colParent){
    //   colParent.color = newColor
    // }

    // if (vars["allChildren"].length-1 === index && !vars["usedColors"].includes(vars["mainColor"])){
    //   random = Math.floor((Math.random() * vars["allChildren"].length-1) + 1)
    //   vars["allChildren"][random].setAttribute("style", "fill:" + vars["mainColor"])
    // }
    if (parentElement) {
      parentElement.color = newColor
    }
    element.setAttribute("style", "fill:" + newColor)
  },
  isMainColor: (element, idArray, vars) => {
    vars["mainColor"] = last(vars["usedColors"])
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
  colorContrast: (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.3, last(vars["usedColors"]), vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["usedColors"].push(newColor)
  },
  colorContrastMain: (element, idArray, vars) => {
    const newColor = randomColorWithContrast(1.2, vars["mainColor"], vars["colorPalette"])
    element.setAttribute("style", "fill:" + newColor)
    vars["usedColors"].push(newColor)
  },
  colorContrastMainSecondary: (element, idArray, vars) => {
    const pal = vars["colorPalette"]
    const posColors = []
    for (let index = 0; index < pal.length; index++) {
      var b = pal[index]
      var c = contrast.ratio(vars["secondaryColor"], b)
      var e = contrast.ratio(vars["mainColor"], b)
      if (c > 1.2 && e > 1.2) {
        posColors.push(b)
      }
    }
    const random = Math.floor((Math.random() * posColors.length - 1) + 1)
    const newColor = posColors[random]
    element.setAttribute("style", "fill:" + newColor)
    vars["usedColors"].push(newColor)
  },
}

const findBestColorsForCollision = (collisions, collision, palette) => {
  const enclosed =  find(collisions, {control:last(collision.enclosed)})
  // const intersection =  find(collisions, {control:first(collision.intersection)})
  let newColor = undefined
  let hasColor = false
  let hasEnclosed = false
  palette.forEach(element => {
    if (enclosed && enclosed.color){
      hasEnclosed = true
      //if (contrast.ratio(enclosed.color, element) > 2){
      if (contrast.isAccessible(enclosed.color, element)){
        newColor = element
        hasColor = true
      }
    }
    if (((!hasEnclosed || (hasEnclosed && hasColor)) && (!enclosed || enclosed.color!==element))){
      collision.intersection.some(el => {
        if (!enclosed || el!==enclosed.control){
          const intersection =  find(collisions, {control:el})
          if (intersection && intersection.color){
            hasColor = true
            if (contrast.ratio(intersection.color, element) > 1.5) {
              newColor = element 
            } else {
              newColor = undefined
              return true
            }
          }
        }
        return false
      })
    }
  })
  if (!hasColor){
    return null
  }

  return newColor
}

const randomColorWithContrast = (contastRatio, contrastColor, palette) => {
  const pal = palette
  const posColors = []
  for (let index = 0; index < pal.length; index++) {
    var b = pal[index]
    var c = contrast.ratio(contrastColor, b)
    if (c > contastRatio) {
      posColors.push(b)
    }
  }
  const random = Math.floor((Math.random() * posColors.length - 1) + 1)
  return posColors[random]
}

export {
  processFunctions
}