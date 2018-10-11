import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from './components/FileUpload/FileUpload'
import ImagesPreview from './components/ImagesPreview/ImagesPreview'
import { processSVG, getVarsFromSVG } from './util/processsvg'
import TextField from '@material-ui/core/TextField'
import { isNumber, isEmpty } from 'lodash'
import Autorenew from '@material-ui/icons/Autorenew'
import IconButton from '@material-ui/core/IconButton'
import provideScrollPosition from 'react-provide-scroll-position'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
import ColorLens from '@material-ui/icons/ColorLens'
import ColorSelector from './components/ColorSelector/ColorSelector'
import colorsJSON from './colorPalette/colorPalettes'

class App extends Component {
  state = {
    images: [],
    numberOfImages: 20,
    isLoading: false,
    completed: 0,
    svgs: [],
    originals: [],
    palettes: [],
    imagesWidth: 300
  }
  changeTimeout = undefined

  onLoaderfinished = (total, doneCallBack) => {
    const svgs = []
    return (svg) => {
      svgs.push(svg)
      if (total === svgs.length) {
        this.setState({ svgs, originals: svgs.map((item)=>{ return {image:item.documentElement.cloneNode(true)}} )}, () => doneCallBack.call(this))   
      }
    }
  }

  processDocs = () => {
    const { numberOfImages, svgs } = this.state
    const images = []
    for (let j = 0; j < svgs.length; j++) {
      const doc = svgs[j]
      for (let index = 0; index < numberOfImages; index++) {
          const vars = getVarsFromSVG(doc.documentElement)
          const p = this.state.palettes[Math.floor((Math.random() * this.state.palettes.length-1) + 1)]          
          vars['colorPalette'] = p.palette
          vars['mainColor'] =  p.palette[0]
          images.push({palette:p, image:processSVG(doc.documentElement.cloneNode(true),vars)})
      }
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

  handleWidthChange = event => {
    clearTimeout(this.changeTimeout)

    let imgWidth = isEmpty(event.target.value) ? 0 : parseInt(event.target.value)
    imgWidth = isNumber(imgWidth) ? imgWidth : 0
    
    this.setState({
      imagesWidth: imgWidth,
      images: [] ,
      isLoading: true
    })

    this.changeTimeout = setTimeout(this.processDocs, 300);
    
  }

  handleClick = event => {
    this.setState({
      images: [] ,
      isLoading: true
    }, this.processDocs)
  }

  handleColorSelectorChange = palettes => {
    this.setState({
      images: [],
      isLoading: true,
      palettes
    }, this.processDocs)
  }

  componentDidMount(){
    const palettes = []
    colorsJSON.palettes.forEach(group => {
      group.colors.forEach(color => {
          color.palettes.forEach(palette => {
            palettes.push(palette)
          })
      })
    })     
    this.setState({ palettes })
  }

  render() {
    const { images, completed, originals } = this.state
    // const { scrollTop } = this.props
    console.log("completed", completed)
    return (
      <div className={css(styles.mainWrapper)}>
        <div className={css(styles.cWrapper, styles.controlsWrapper)}>
          <div className={css(styles.cWrapper)}>
            <FileUpload onChange={this.onImageChange} />
            <IconButton className={css(styles.settingsMenuIcon)} onClick={this.handleClick} color="secondary">
              <Autorenew />
            </IconButton>
            <SettingsMenu 
            classPanel={{ ...styles.cWrapper, ...styles.settingsMenu}}
            iconClass={styles.settingsMenuIcon}>
              <TextField
                  color="secondary"
                  style={{ width: 80 }}
                  label="img per SVG"
                  value={this.state.numberOfImages}
                  onChange={this.handleChange}
                />
                <TextField
                  color="secondary"
                  style={{ width: 80 }}
                  label="img width"
                  value={this.state.imagesWidth}
                  onChange={this.handleWidthChange}
                />
            </SettingsMenu>
            <SettingsMenu icon={ColorLens} className={styles.progress} iconClass={styles.settingsMenuIcon} isOpen={false}>
              <ColorSelector colorsJSON={colorsJSON} onChange={this.handleColorSelectorChange}/>
            </SettingsMenu>
          </div>
          <header className={css(styles.labelOriginals, styles.header)}>
           {'Process SVG'}
          </header>
          <div className={css(styles.cWrapper)}>
            <ImagesPreview 
              label={'Loaded SVGs'} 
              className={styles.progress} 
              showEmpty={true}
              images={originals} 
              labelClass={styles.labelOriginals}
              imageClass={styles.imageSmall} />
          </div>
        </div>
        <ImagesPreview  imgWidth={this.state.imagesWidth} className={styles.imgsWrapper} images={images} imageClass={styles.image} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  progress: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    overflow: 'hidden'
  },
  header:{
    fontSize: 30,
    position: 'absolute',
    left: 'calc(50% - 177px)'
  },
  labelOriginals: {
    color:' #f50057',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em'
  },
  imgsWrapper: {
  
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  cWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    ':nth-child(1n)>*': {
      marginRight: 5,
      display: 'flex'
    },
  },
  settingsMenu: {
    marginLeft: 20, 
    marginRight: 6
  },
  settingsMenuIcon:{
    padding:'9px 12px'
  },
  controlsWrapper: {
    padding: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 20,
    height:50,
    position: 'relative',
    justifyContent:' space-between',
    borderBottom: '1px solid rgba(225, 0, 80, 0.5)'
  },
  image: {
    height: 'auto',
    margin: 10
  },
  imageSmall: {
    width: 50,
    height: 50,
    margin: 0,
    marginLeft: 15,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
})

export default provideScrollPosition(App)
