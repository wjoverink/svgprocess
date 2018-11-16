import { processFunctions } from './processFunctions'
import { processVars } from './processVars'
const splitOn = "_"

const processSVG = (svg, processvars) => {
  console.log("=============START================")
  const children = recursivelyGetChildNodes(svg)
  processvars["allChildren"] = children
  children.forEach((child, index) => {
    if (child.className.baseVal) {
      const idArray = child.id.split(splitOn)
      // if (!idArray.includes('dontTouch')){
      idArray.forEach((str) => {
        if (processFunctions[str]) {
          processFunctions[str](child, idArray, processvars)
        } else { // if (canBeTarget(child)){
          //AUTO color
          processFunctions["palleteColorNotUsed"](child, idArray, processvars, index)
        }
      })
      //}
    } else { //if (canBeTarget(child)){
      //AUTO color
      processFunctions["palleteColorNotUsed"](child, [], processvars, index)
    }
  })
  console.log("=============END================")
  return svg
}

const collisionDetection = (svg) => {
  const collisions = []
  const children = recursivelyGetChildNodes(svg)
  children.forEach((child, index) => {
    const coll = { control: child, color: undefined, enclosed: [], intersection: [] }
    collisions.push(coll)
    children.forEach((compChild, compIndex) => {
      if (child !== compChild) {
        // var box = compChild.getBBox()
        var checkEnclosure = enclosesRect(child, compChild)
        var checkIntersection = intersectRect(child, compChild)
        if (checkEnclosure) {
          coll.enclosed.push(compChild)
        } else if (checkIntersection && !enclosesRect(compChild, child)) {
          coll.intersection.push(compChild)
        }
      }
    })
  })
  return collisions
}


const enclosesRect = (c1, c2) => {
  var r1 = c1.getBBox();
  var r2 = c2.getBBox();
  return r2.x <= r1.x && r2.y <= r1.y && r2.width + r2.x >= r1.width + r1.x && r2.height + r2.y >= r1.height + r1.y
}

const intersectRect = (c1, c2) => {
  var r1 = c1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
  var r2 = c2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT

  //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

const canBeTarget = (child) => {
  return child.setAttribute && child.nodeName !== 'g' && child.nodeName !== 'style'
}

const recursivelyGetChildNodes = (svg) => {
  let retVal = []
  const idArray = svg.id.split(splitOn)
  if (!idArray.includes('dontTouch')) {
    svg.childNodes.forEach((child) => {
      if (canBeTarget(child)) {
        retVal.push(child)
      }
      if (child.childNodes && child.childNodes.length > 0) {
        retVal = retVal.concat(recursivelyGetChildNodes(child))
      }
    })
  }

  return retVal
}

const getVarsFromSVG = (svg) => {
  const retval = {}
  if (svg.id) {
    const idArray = svg.id.split(splitOn)
    idArray.forEach((str) => {
      const v = str.split(":")
      if (processVars[v[1]]) {
        retval[v[0]] = processVars[v[1]](v, idArray, retval)
      }
    })
  }
  return retval
}

export {
  processSVG,
  getVarsFromSVG,
  collisionDetection
}