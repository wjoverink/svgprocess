import randomcolor from 'randomcolor'

const processVars = {
  randomColor: (name, idArray) => {
    return randomcolor()
  },
  colorPalette: (name, idArray) => {
    return [...randomcolor({
      count: 20,
      hue: 'blue',
      // luminosity: 'dark',
    })]
  },
}

export {
  processVars
}