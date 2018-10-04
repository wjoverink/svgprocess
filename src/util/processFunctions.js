import randomcolor from 'randomcolor'

const processFunctions = {
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
  processFunctions
}