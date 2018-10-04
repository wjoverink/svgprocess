import {processFunctions} from './processFunctions'

const processSVG = (svg) => {
  const children = [...svg.childNodes]
  children.forEach((child) => { 
    if (child.setAttribute && child.id){
      const idArray = child.id.split("_")
      idArray.forEach((str) => {
        if (processFunctions[str]){
          processFunctions[str](child, idArray)
        }

      })
    }
  });
  return svg
}

export {
  processSVG
}