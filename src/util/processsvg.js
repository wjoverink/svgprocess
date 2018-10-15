import { processFunctions } from './processFunctions'
import { processVars } from './processVars'
const splitOn  = ";"

const processSVG = (svg, processvars) => {
  const children = recursivelyGetChildNodes(svg)
  processvars["allChildren"] = children
  children.forEach((child, index) => { 
    if (child.id){
      const idArray = child.id.split(splitOn)
      idArray.forEach((str) => {
        if (processFunctions[str]){
          processFunctions[str](child, idArray, processvars)
        } else { // if (canBeTarget(child)){
          //AUTO color
          processFunctions["palleteColorNotUsed"](child, idArray, processvars, index)
        }
      })
    } else { //if (canBeTarget(child)){
      //AUTO color
      processFunctions["palleteColorNotUsed"](child, [], processvars, index)
    }
  });
  return svg
}

const canBeTarget = (child) => {
  return child.setAttribute && child.nodeName !== 'g' && child.nodeName !== 'style'
}

const recursivelyGetChildNodes = (svg) => {
  let retVal = []
  svg.childNodes.forEach((child) => { 
    if (canBeTarget(child)){
      retVal.push(child)
    }
    if (child.childNodes && child.childNodes.length>0){
      retVal = retVal.concat(recursivelyGetChildNodes(child))
    }
  })

  return retVal
}

const getVarsFromSVG = (svg) => {
  const retval = {}
  if (svg.id){
    const idArray = svg.id.split(splitOn)
    idArray.forEach((str) => {
      const v = str.split(":")
      if (processVars[v[1]]){
        retval[v[0]] = processVars[v[1]](v, idArray, retval)
      }
    })
  }
  return retval
}

export {
  processSVG,
  getVarsFromSVG
}