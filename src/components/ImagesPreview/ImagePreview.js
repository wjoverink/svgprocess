import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import SaveAlt from '@material-ui/icons/SaveAlt'
import { IconButton } from '@material-ui/core'
import { saveAsSvg, downloadfile } from '../../util/downloadHelper'
import TextWithClipBoard from '../controls/TextWithClipBoard/TextWithClipBoard'
import PalettePreview from './PalettePreview'
import ImageControl from './ImageControl'
import VoteControl from './VoteControl'
import { convertToMovie, toPng } from '../../util/svgToMovie'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import LinearProgress from '@material-ui/core/LinearProgress'

class ImagePreview extends PureComponent {
  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object,
    showDivider: PropTypes.bool,
  }

  state = {
    showCanvas: false,
    anchorEl: null,
    isLoading: false
  }

  myRef = React.createRef()
  myImageControlRef = React.createRef()

  _createName = ext => {
    return this.props.image.name.slice(0, -4) +
    '_' +
    this.props.image.palette.name.replace(' ', '-') +
    '_' +
    this.props.image.palette.colorName.replace(' ', '-') +
    ext
  }

  _saveSvg = () => {
    saveAsSvg(this.props.image.image, this._createName('.svg'))
  }

  _finishedPng(url){
    this.setState({ showCanvas:false, anchorEl: null, isLoading: false });
    downloadfile(url,this._createName('.png'))
  }

  _savePng = () => {
    const t = this.myImageControlRef.current.myRef.current.getBoundingClientRect()
    this.setState({
      showCanvas: true,
      anchorEl: null,
      isLoading: true
    })
    toPng(this.props.image.image, this.myRef.current, t.width, t.height, this._finishedPng.bind(this))
  }

  _finishedMovie(url){
    this.setState({ showCanvas:false, anchorEl: null, isLoading: false });
    downloadfile(url,this._createName('.webm'))
  }

  _saveAsMovie = () => {
    const t = this.myImageControlRef.current.myRef.current.getBoundingClientRect()
    this.setState({
      showCanvas: true,
      anchorEl: null,
      isLoading: true
    })
    convertToMovie(this.props.image.image, this.myRef.current, t.width, t.height, this._finishedMovie.bind(this))
  }

  _handleDownloadClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const { className, image, width, showDivider, ...other } = this.props
    const { showCanvas, anchorEl, isLoading } = this.state
    const palletesString = image.palette && image.palette.palette.toString()
    const isSmall =  width < 285

    return (
      <div className={css(styles.wrapper, className)} {...other}>
        <div className={css(styles.relative)}>
          <ImageControl className={!showCanvas ? styles.wrapper : styles.hide} width={width} ref={this.myImageControlRef} image={image}/>
          <canvas width={width} className={css(showCanvas ? styles.wrapper : styles.hide)} ref={this.myRef} />
          {isLoading && (<LinearProgress  color="secondary"  classes={{
            colorPrimary: css(styles.loading)
          }} />)}
        </div>
        {image.palette && (<div className={css(styles.labelClass)}>
          <TextWithClipBoard clipBoardText={image.palette.colorName}>
            <span className={css(styles.bold)}>color: </span><span>{image.palette.colorName}</span>
          </TextWithClipBoard>
          <TextWithClipBoard clipBoardText={palletesString}>
            <span className={css(styles.bold)}>palette: </span><span>{image.palette.name}</span>
          </TextWithClipBoard>
          <TextWithClipBoard clipBoardText={image.name}>
            <span className={css(styles.bold)}>file: </span><span>{image.name}</span>
          </TextWithClipBoard>
        </div>)}
        {image.palette && (
          <div className={css(styles.pColorWrapper, isSmall && styles.directionColumn)}>
            <div className={css(styles.pColorWrapper)}>
              <PalettePreview palette={image.palette.palette} usedColors={image.usedColors} />
            </div>
            <div className={css(styles.buttons, isSmall && styles.buttonsBreak)}>
              <VoteControl/>
              <IconButton onClick={this._handleDownloadClick} aria-label="Save SVG" >
                <SaveAlt className={css(styles.paletteDiv)} />
              </IconButton>
            </div>
          </div>
        )}
        {showDivider && (
          <div className={css(styles.line)} />
        )}
      
         <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._handleClose}>
          <MenuItem onClick={this._saveSvg}>.svg</MenuItem>
          <MenuItem onClick={this._savePng}>.png</MenuItem>
          <MenuItem onClick={this._saveAsMovie}>.webm</MenuItem>
        </Menu>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  relative: {
    position: 'relative',
    textAlign: 'center'
  },
  loading: {
    backgroundColor: '#EB1D25'
  },
  pColorWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  directionColumn: {
    flexDirection: 'column',
  },
  buttons: {
    marginLeft: 'auto',
    ':nth-child(1n)>*': {
      marginTop: '-14px'
    },
    ':nth-child(1n)>*:last-child': {
      marginRight: '-10px'
    }
  },
  hide:{
    display: 'none'
  },
  buttonsBreak: {
    marginLeft: -12,
    marginTop: 20,
    display: 'flex',
    justifyContent:' space-between',
    marginBottom: -18
  },
  doneIcon: {
    width: 14,
    height: 14,
    color: 'white'
  },
  doneIconBlack: {
    color: 'black'
  },
  paletteDiv: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold'
  },
  line: {
    height: 1,
    marginTop: 21,
    borderBottom: 'solid 1px #979797'
  },
  labelClass: {
    margin: '30px 0',
    color: '#bbb',
    fontSize: '11px',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    lineHeight: '1.4em',
    flexDirection: 'column',
    textTransform: 'uppercase'
  }
})

export default ImagePreview
