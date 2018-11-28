import { processFunctions } from './processFunctions'

const splitOn = "_"

const processSVG = (svg, processvars) => {
  const children = recursivelyGetChildNodes(svg)
  processvars["allChildren"] = children
  children.forEach((child, index) => {
    if (child.className.baseVal) {
      const idArray = child.id.split(splitOn)
      idArray.forEach((str) => {
        if (processFunctions[str]) {
          processFunctions[str](child, idArray, processvars)
        } else { 
          //AUTO color
          processFunctions["palleteColorNotUsed"](child, idArray, processvars, index)
        }
      })
    } else {
      //AUTO color
      processFunctions["palleteColorNotUsed"](child, [], processvars, index)
    }
  })
  return svg
}

const nonUseableNodeNames = ['g', 'style', 'defs', '#text', 'symbol', 'use']

const canBeTarget = (child) => {
  return child.setAttribute && !nonUseableNodeNames.includes(child.nodeName)
}

const canHaveChildren= (child) => {
  return child.childNodes && child.childNodes.length > 0 && child.nodeName !== 'style'
}

const recursivelyGetChildNodes = (svg) => {
  let retVal = []
  const idArray = svg.id.split(splitOn)
  if (!idArray.includes('dontTouch')) {
    svg.childNodes.forEach((child) => {
      if (canBeTarget(child)) {
        retVal.push(child)
      }
      if (canHaveChildren(child)) {
        retVal = retVal.concat(recursivelyGetChildNodes(child))
      }
    })
  }

  return retVal
}

export {
  processSVG
}