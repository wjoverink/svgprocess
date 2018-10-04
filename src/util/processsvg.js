import randomcolor from 'randomcolor'

const processSVG = (svg) => {
  const children = [...svg.childNodes]
  children.forEach((child) => { 
    if (child.setAttribute && child.id){
      const idArray = child.id.split("_")
      idArray.forEach((str) => {
        if (processTYPES[str]){
          processTYPES[str](child, idArray)
        }

      })
    }
  });
  return svg
}

const processTYPES = {
  randomFill: (element, idArray) => {
    element.setAttribute("style", "fill:" + randomcolor())
  },
  stroke :  (element, idArray) => {
    element.setAttribute('stroke', randomcolor())
    element.setAttribute('stroke-width','4')
  },
  randomFillBlueColors: (element, idArray) => {
    element.setAttribute("style", "fill:" + randomcolor({
      luminosity: 'light',
      hue: 'blue'
   }))
  },
  addText: (element, idArray) => {
    element.textContent = "Hi random:"  + randomcolor()
    element.setAttribute("style", "fill:purple")
  },
}

export {
  processSVG
}