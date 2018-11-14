import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import FileUpload from '../controls/FileUpload/FileUpload'
import ImagesPreview from '../ImagesPreview/ImagesPreview'
import { processSVG, getVarsFromSVG, collisionDetection } from '../../util/processsvg'
import colorsJSON from '../../colorPalette/colorPalettes'
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
    className: PropTypes.object,
    palettes: this.props.palettes
  }

  static propTypes = {
    imagesWidth: PropTypes.number,
    numberOfImages: PropTypes.number,
    palettes: PropTypes.array
  }

  changeTimeout = undefined

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
        const p = this.state.palettes[Math.floor((Math.random() * this.state.palettes.length - 1) + 1)]
        vars['colorPalette'] = p.palette
        vars['collisions'] = collisions
        vars['mainColor'] = p.palette[0]
        vars['usedColors'] = []
        vars["alwaysUseMainColor"] = this.state.alwaysUseMainColor
        images.push({ palette: p, image: processSVG(doc.documentElement.cloneNode(true), vars), name: fileName })
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

  componentDidMount() {
    const palettes = []
    colorsJSON.palettes.forEach(group => {
      group.colors.forEach(color => {
        color.palettes.forEach(palette => {
          palettes.push(palette)
          palette["colorName"] = color.name
          palette["groupName"] = group.name
        })
      })
    })
    this.setState({ palettes })
  }
  // imagesWidth: PropTypes.number,
  // numberOfImages: PropTypes.number,
  componentDidUpdate(prevProps) {
    if (prevProps.imagesWidth !== this.props.imagesWidth ||
      prevProps.numberOfImages !== this.props.numberOfImages
    ) {
      this.setState({
        images: [],
        isLoading: true,
      }, this.processDocs)
    }
    if ( prevProps.palettes !== this.props.palettes
    ) {
      this.setState({
        images: [],
        isLoading: true,
        palettes: this.props.palettes
      }, this.processDocs)
    }
  }

  render() {
    const { images, originals } = this.state
    const { className } = this.props
    return (
      <div className={css(styles.controlsWrapper, className)}>
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
    padding: 100
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
    marginBottom: 50
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