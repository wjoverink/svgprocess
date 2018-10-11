const processVars = {
  firstColor: (name, idArray, vars) => {
    var p = vars["colorPalette"]
    console.log(p[0])
    return p[0]
  },
}

export {
  processVars
}