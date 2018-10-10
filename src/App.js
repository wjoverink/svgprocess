import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagesPreview from './components/ImagesPreview/ImagesPreview'
import { processSVG, getVarsFromSVG, autoProcessSVG } from './util/processsvg'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { isNumber, isEmpty } from 'lodash'
import Autorenew from '@material-ui/icons/Autorenew'
import Button from '@material-ui/core/Button'
// import LinearProgress from '@material-ui/core/LinearProgress'

class App extends Component {
  state = {
    images: [],
    numberOfImages: 10,
    autoRender: true,
    isLoading: false,
    completed: 0,
    svgs: [],
    originals: []
  }
  changeTimeout = undefined

  onLoaderfinished = (total, doneCallBack) => {
    const svgs = []
    return (svg) => {
      svgs.push(svg)
      if (total === svgs.length) {
        this.setState({ svgs, originals: svgs.map((item)=> item.documentElement.cloneNode(true) )}, () => doneCallBack.call(this))   
      }
    }
  }

  processDocs = () => {
    const { numberOfImages, autoRender, svgs } = this.state
    const images = []
    // const total = this.svgs.length * numberOfImages
    // const onePerc = (total/100)
    // const perc =  20 / onePerc
    for (let j = 0; j < svgs.length; j++) {
      const doc = svgs[j]
      for (let index = 0; index < numberOfImages; index++) {
        if (!autoRender) {
          images.push(processSVG(doc.documentElement.cloneNode(true), getVarsFromSVG(doc.documentElement)))
        } else {
          images.push(autoProcessSVG(doc.documentElement.cloneNode(true)))
        }
        // if (index%20 === 0){
        //   this.setState({ completed: Math.round(this.state.completed + perc) })
        // }
      }
     // this.setState({ completed: Math.round(numberOfImages / onePerc) })
    }
    this.setState({ images, isLoading: false, completed:0 })
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
    const { images, isLoading, completed, originals } = this.state
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
          <ImagesPreview 
            label={'Originals'} 
            className={styles.progress} 
            images={originals} 
            labelClass={styles.labelOriginals}
            imageClass={styles.imageSmall} />
        </div>
        {/* <LinearProgress 
        variant="determinate" 
        value={completed} 
        className={css(styles.progress)} 
        color="secondary" /> */}
        <ImagesPreview className={styles.imgsWrapper} images={images} imageClass={styles.image} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  progress: {
    marginLeft: 'auto',
    alignItems: 'flex-end'
  },
  labelOriginals: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em'
  },
  imgsWrapper: {
    borderTop: '1px solid rgba(225, 0, 80, 0.5)'
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
    marginTop: 10,
    marginBottom: 20,
    ':nth-child(1n)>*': {
      marginRight: 20,
      display: 'flex'
    },
  },
  image: {
    width: 400,
    height: 400,
    margin: 20
  },
  imageSmall: {
    width: 50,
    height: 'auto',
    margin: 0,
    marginLeft: 15
  },
  formControlLabel: {
    paddingTop:0,
    paddingBottom:0
  }
})

export default App;
