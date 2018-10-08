import randomcolor from 'randomcolor'

const processVars = {
  randomColor: (name, idArray) => {
    return randomcolor()
  },
  colorPalette: (name, idArray) => {
    // return [...randomcolor({
    //   count: 20,
    //   hue: 'blue',
    //   // luminosity: 'dark',
    // })]
    return [
      "#D72C52",
      "#AE5324",
      "#D7A82C",
      "#E7FF34",
      "#1F9826",
      "#2CBFD7",
      "#3B34FF",
      "#C534FF"
    ]
  },
}

export {
  processVars
}