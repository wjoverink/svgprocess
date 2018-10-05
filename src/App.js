import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagePreview from './components/ImagePreview/ImagePreview'
import { processSVG, getVarsFromSVG } from './util/processsvg.js'
class App extends Component {
  state = {
    files: []
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
    const callback = this.onLoaderfinished(files.length, 1,  [])
    const parser = new DOMParser()
    for (var i = 0; i < files.length; i++) { //for multiple files          
      (function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          const doc = parser.parseFromString(e.target.result, "image/svg+xml")
          const imgArray = []
          const processvars = getVarsFromSVG(doc.documentElement)
          for (let index = 0; index <= 3; index++) {
            imgArray.push(processSVG(doc.documentElement.cloneNode(true), processvars))
          }

          callback(imgArray)
        }
        reader.readAsText(file, "UTF-8");
      })(files[i]);
    }
  }

  render() {
    const { files } = this.state
    return (
      <div className={css(styles.mainWrapper)}>
        <header className="App-header">
          Process-svg
        </header>
        <FileUpload onChange={this.onImageChange} />
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
  wrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap'
  },
  image: {
    width: 400,
    height: 400,
    margin: 20
  }
})

export default App;
