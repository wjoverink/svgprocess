import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagePreview from './components/ImagePreview/ImagePreview'
import { processSVG, getVarsFromSVG, recursivelyGetChildNodes } from './util/processsvg'
import TextField from '@material-ui/core/TextField'
import { processVars } from './util/processVars'
import { processFunctions } from './util/processFunctions'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class App extends Component {
  state = {
    files: [],
    numberOfImages: 10,
    autoRender:true
  }
  onLoaderfinished = (total, count, imgList) => {
    return (newImages) => {
      imgList = imgList.concat(newImages)
      if (total === count) {
        this.setState({ files: imgList })
      }
      count++
    }
  }

  onImageChange = (files) => {
    this.setState({ files: [] })
    const totalImages = this.state.numberOfImages
    const autoRender = this.state.autoRender
    const callback = this.onLoaderfinished(files.length, 1,  [])
    const parser = new DOMParser()
    for (var i = 0; i < files.length; i++) { //for multiple files          
      (function (file) {
        var reader = new FileReader();
        reader.onload = (e) => {
          const doc = parser.parseFromString(e.target.result, "image/svg+xml")
          const imgArray = []
          for (let index = 0; index <= totalImages; index++) {
            if (!autoRender){
              const pVars = getVarsFromSVG(doc.documentElement)
              imgArray.push(processSVG(doc.documentElement.cloneNode(true), pVars))
            } else {
              const pVars = []
              pVars["colorPalette"] = processVars.colorPalette()
              imgArray.push(doc.documentElement.cloneNode(true))
              const children = recursivelyGetChildNodes(imgArray[imgArray.length-1])
              for (let j = 0; j < children.length; j++) {
                const element = children[j];
                if (element.setAttribute){
                  processFunctions["palleteColorNotUsed"](element, [], pVars)
                }
              } 
            }
          }

          callback(imgArray)
        }
        reader.readAsText(file, "UTF-8");
      })(files[i]);
    }
  }

  handleChangeCheck = event => {
    this.setState({autoRender: event.target.checked});
  };

  handleChange = event => {
    this.setState({
      numberOfImages: parseInt(event.target.value),
    });
  };

  render() {
    const { files } = this.state
    return (
      <div className={css(styles.mainWrapper)}>
        {/* <header className="App-header">
          Process-svg
        </header> */}
        <div className={css(styles.controlsWrapper)}>
          <FileUpload onChange={this.onImageChange} />
          <TextField
            // disabled={this.state.autoRender}
            label="images per SVG"
            value={this.state.numberOfImages}
            onChange={this.handleChange}
          />
         <FormControlLabel
          control={
            <Checkbox
              checked={this.state.autoRender}
              onChange={this.handleChangeCheck}
            />
          }
          label="Auto"
        />
        </div>
        <div className={css(styles.wrapper)}>
          {files.map((item, index) => (
            <ImagePreview className={css(styles.image)} key={"image" + index} image={item} />
          ))}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
    borderTop: '1px solid gray',
    marginTop: 20
  },
  image: {
    width: 400,
    height: 400,
    margin: 20
  }
})

export default App;
