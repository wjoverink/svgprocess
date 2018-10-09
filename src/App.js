import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagePreview from './components/ImagePreview/ImagePreview'
import { processSVG, getVarsFromSVG } from './util/processsvg.js'
import TextField from '@material-ui/core/TextField';
class App extends Component {
  state = {
    files: [],
    numberOfImages: 10
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
    const callback = this.onLoaderfinished(files.length, 1,  [])
    const parser = new DOMParser()
    for (var i = 0; i < files.length; i++) { //for multiple files          
      (function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          const doc = parser.parseFromString(e.target.result, "image/svg+xml")
          const imgArray = []
          for (let index = 0; index <= totalImages; index++) {
            const processvars = getVarsFromSVG(doc.documentElement)
            imgArray.push(processSVG(doc.documentElement.cloneNode(true), processvars))
          }

          callback(imgArray)
        }
        reader.readAsText(file, "UTF-8");
      })(files[i]);
    }
  }

  handleChange = event => {
    this.setState({
      numberOfImages: parseInt(event.target.value),
    });
  };

  render() {
    const { files } = this.state
    return (
      <div className={css(styles.mainWrapper)}>
        <header className="App-header">
          Process-svg
        </header>
        <div className={css(styles.controlsWrapper)}>
          <FileUpload onChange={this.onImageChange} />
          <TextField
            label="images per SVG"
            value={this.state.numberOfImages}
            onChange={this.handleChange}
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
