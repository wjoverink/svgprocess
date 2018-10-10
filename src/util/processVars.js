import palettes from '../colorPalette/colorPalettes'

const processVars = {
  colorPalette: (name, idArray, vars) => {
    var p = palettes
    const random = Math.floor((Math.random() * p.palettes.length-1) + 1)
    const palette = p.palettes[random].palette
    const withHash = palette.reduce((total, currentValue, currentIndex, arr) => {
        if (currentValue.indexOf("#") === 0){
          total.push(currentValue)
        } else {
          total.push("#"+currentValue)
        }
        return total
    }, [])
    return withHash
  },
  randomPaletteColor: (name, idArray, vars) => {
    var p = vars["colorPalette"]
    const random = Math.floor((Math.random() * p.length-1) + 1)
    return p[random]
  },
  firstColor: (name, idArray, vars) => {
    var p = vars["colorPalette"]
    console.log(p[0])
    return p[0]
  },
}

export {
  processVars
}