import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagePreview from './components/ImagePreview/ImagePreview'
import { processSVG, getVarsFromSVG, autoProcessSVG } from './util/processsvg'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { isNumber, isEmpty } from 'lodash'
import Autorenew from '@material-ui/icons/Autorenew'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

class App extends Component {
  state = {
    images: [],
    numberOfImages: 10,
    autoRender: true,
    isLoading: false,
    completed: 0,
  }
  svgs = []
  changeTimeout = undefined

  onLoaderfinished = (total, doneCallBack) => {
    this.svgs.length = 0
    return (svg) => {
      this.svgs.push(svg)
      if (total === this.svgs.length) {
        doneCallBack.call(this)
      }
    }
  }

  processDocs = () => {
    const { numberOfImages, autoRender } = this.state
    const imgArray = []
    // const total = this.svgs.length * numberOfImages
    // const onePerc = (total/100)
    // const perc =  20 / onePerc
    for (let j = 0; j < this.svgs.length; j++) {
      const doc = this.svgs[j]
      for (let index = 0; index < numberOfImages; index++) {
        if (!autoRender) {
          imgArray.push(processSVG(doc.documentElement.cloneNode(true), getVarsFromSVG(doc.documentElement)))
        } else {
          imgArray.push(autoProcessSVG(doc.documentElement.cloneNode(true)))
        }
        // if (index%20 === 0){
        //   this.setState({ completed: Math.round(this.state.completed + perc) })
        // }
      }
     // this.setState({ completed: Math.round(numberOfImages / onePerc) })
    }
    this.setState({ images: imgArray, isLoading: false, completed:0 })
  }

  onImageChange = (files) => {
    this.setState({ images: [], isLoading: true })
    const doneCallBack = this.processDocs
    const callback = this.onLoaderfinished(files.length, doneCallBack)
    const parser = new DOMParser()
    for (var i = 0; i < files.length; i++) { //for multiple files          
      (function (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          callback(parser.parseFromString(e.target.result, "image/svg+xml"))
        }
        reader.readAsText(file, "UTF-8")
      })(files[i])
    }
  }

  handleChangeCheck = event => {
    this.setState({ autoRender: event.target.checked, images: [], isLoading:true  }, this.processDocs)
  };

  handleChange = event => {
    clearTimeout(this.changeTimeout)

    let imgCount = isEmpty(event.target.value) ? 0 : parseInt(event.target.value)
    imgCount = isNumber(imgCount) ? imgCount : 0
    
    this.setState({
      numberOfImages: imgCount,
      images: [] ,
      isLoading: imgCount > 0 ? true : false
    })

    this.changeTimeout = setTimeout(this.processDocs, 300);
    
  }

  handleClick = event => {
    this.setState({
      images: [] ,
      isLoading: true
    }, this.processDocs)
  }

  render() {
    const { images, isLoading, completed } = this.state
    console.log("completed", completed)
    return (
      <div className={css(styles.mainWrapper)}>
        {/* <header className="App-header">
          Process-svg
        </header> */}
        <div className={css(styles.controlsWrapper)}>
          <FileUpload onChange={this.onImageChange} />
          <Button onClick={this.handleClick} variant="outlined" color="secondary">
            Refresh
            <Autorenew style={{marginLeft:8}} />
          </Button>
          <TextField
            color="secondary"
            style={{ width: 120 }}
            label="images per SVG"
            value={this.state.numberOfImages}
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                classes={{root: css(styles.formControlLabel)}}
                checked={this.state.autoRender}
                onChange={this.handleChangeCheck}
              />
            }
            label="Auto generate"
          />
        </div>
        {/* <LinearProgress 
        variant="determinate" 
        value={completed} 
        className={css(styles.progress)} 
        color="secondary" /> */}

        <div className={css(styles.wrapper)}>
          {images.map((item, index) => (
            <ImagePreview className={css(styles.image)} key={"image" + index} image={item} />
          ))}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  progress: {
   
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    marginBottom: 20,
    ':nth-child(1n)>*': {
      marginRight: 20,
      display: 'flex'
    },
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
    borderTop: '1px solid rgba(225, 0, 80, 0.5)'
  },
  image: {
    width: 400,
    height: 400,
    margin: 20
  },
  formControlLabel: {
    paddingTop:0,
    paddingBottom:0
  }
})

export default App;
