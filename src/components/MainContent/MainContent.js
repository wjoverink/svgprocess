import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from '../controls/FileUpload/FileUpload'
import ImagesPreview from '../ImagesPreview/ImagesPreview'
import { processSVG, getVarsFromSVG, collisionDetection } from '../../util/processsvg'
import { colors } from '../../styles/styles'
import PropTypes from 'prop-types'

class MainContent extends Component {
  state = {
    images: [],
    isLoading: false,
    completed: 0,
    svgs: [],
    originals: [],
    alwaysUseMainColor: false,
    className: PropTypes.object
  }

  mainContentRef= React.createRef()

  static propTypes = {
    imagesWidth: PropTypes.number,
    numberOfImages: PropTypes.number,
    palettes: PropTypes.array
  }

  onLoaderfinished = (total, doneCallBack) => {
    const svgs = []
    return (svg, fileName) => {
      svgs.push(svg)
      if (total === svgs.length) {
        this.setState({ svgs, originals: svgs.map((item) => { return { name: fileName, image: item.documentElement.cloneNode(true) } }) },
          () => doneCallBack.call(this))
      }
    }
  }

  processDocs = () => {
    const { svgs } = this.state
    const images = []
    for (let j = 0; j < svgs.length; j++) {
      const doc = svgs[j]
      const collisions = collisionDetection(this.state.originals[j].image)
      const fileName = this.state.originals[j].name
      for (let index = 0; index < this.props.numberOfImages; index++) {
        const vars = getVarsFromSVG(doc.documentElement)
        const p = this.props.palettes[Math.floor((Math.random() * this.props.palettes.length - 1) + 1)]
        vars['colorPalette'] = p.palette
        vars['collisions'] = collisions
        vars['mainColor'] = p.palette[0]
        vars['usedColors'] = []
        vars["alwaysUseMainColor"] = this.state.alwaysUseMainColor
        images.push({ 
          palette: p, 
          image: processSVG(doc.documentElement.cloneNode(true), vars), 
          name: fileName, 
          usedColors:  vars['usedColors']  })
      }
    }
    this.setState({ images, isLoading: false, completed: 0 })
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
          callback(parser.parseFromString(e.target.result, "image/svg+xml"), file.name)
        }
        reader.readAsText(file, "UTF-8")
      })(files[i])
    }
  }

  handleClick = event => {
    this.setState({
      images: [],
      isLoading: true
    }, this.processDocs)
  }

  handleCheckboxClick = event => {
    this.setState({
      images: [],
      isLoading: true,
      alwaysUseMainColor: event.target.checked
    }, this.processDocs)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imagesWidth !== this.props.imagesWidth ||
      prevProps.numberOfImages !== this.props.numberOfImages || 
      prevProps.refresh !== this.props.refresh ||
      prevProps.palettes !== this.props.palettes
    ) {
      this.setState({
        images: [],
        isLoading: true,
      }, this.processDocs)
    }
  }

  render() {
    const { images, originals } = this.state
    const { className } = this.props
    return (
      <div ref={this.mainContentRef} className={css(styles.controlsWrapper, className)}>
        <div className={css(styles.rWrapper)}>
          <FileUpload onChange={this.onImageChange} />
          <ImagesPreview
            imgWidth={72}
            className={styles.progress}
            images={originals}
            labelClass={styles.labelOriginals}
            imageClass={styles.imageSmall} />
        </div>
        <ImagesPreview
          showDivider={true}
          imgWidth={this.props.imagesWidth}
          className={styles.imgsWrapper}
          images={images}
          imageClass={styles.image} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  controlsWrapper: {
    backgroundColor: colors.mainBackgroundColor,
    overflow: 'auto',
    padding: 80
  },
  progress: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    overflow: 'hidden'
  },
  imgsWrapper: {
    margin: '0 -20px'
  },
  rWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 30
  },
  image: {
    height: 'auto',
    margin: 20,
    marginBottom: 50
  },
  imageSmall: {
    margin: 0,
    marginLeft: 15,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
})

export default MainContent