import { processFunctions } from './processFunctions'
import { processVars } from './processVars'
const splitOn  = ";"

const processSVG = (svg, processvars) => {
  const children = recursivelyGetChildNodes(svg)
  children.forEach((child) => { 
    if (child.id){
      const idArray = child.id.split(splitOn)
      idArray.forEach((str) => {
        if (processFunctions[str]){
          processFunctions[str](child, idArray, processvars)
        } else if (child.setAttribute){
          //AUTO color
          processFunctions["palleteColorNotUsed"](child, idArray, processvars)
        }
      })
    } else if (child.setAttribute){
      //AUTO color
      processFunctions["palleteColorNotUsed"](child, [], processvars)
    }
  });
  return svg
}

const recursivelyGetChildNodes = (svg) => {
  let retVal = []
  svg.childNodes.forEach((child) => { 
    retVal.push(child)
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