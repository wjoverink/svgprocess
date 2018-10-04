import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagePreview from './components/ImagePreview/ImagePreview'
import { processSVG, getVarsFromSVG } from './util/processsvg.js'
class App extends Component {
  state = {
    files: []
  }

  onImageChange = (file) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reader.result, "image/svg+xml");
      const imgArray = []
      const processvars = getVarsFromSVG(doc.documentElement)
      for (let index = 0; index <= 23; index++) {
        imgArray.push(processSVG(doc.documentElement.cloneNode(true), processvars))
        
      }
      this.setState({ files: imgArray})
    }
    reader.readAsText(file)
  }

  render() {
    const {files} = this.state
    return (
      <div className={css(styles.mainWrapper)}>
        <header className="App-header">
        Process-svg
        </header>
        <FileUpload onChange={this.onImageChange}/>
        <div className={css(styles.wrapper)}>
          {files.map((item, index) => (
            <ImagePreview className={css(styles.image)} key={"image" + index} image={item}/>
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
    width:400,
    height:400,
    margin:20
  }
})

export default App;
