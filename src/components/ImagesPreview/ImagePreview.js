import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import SaveAlt from '@material-ui/icons/SaveAlt'
import CheckCircle from '@material-ui/icons/CheckCircle'
import HighlightOff from '@material-ui/icons/HighlightOff'
import { IconButton } from '@material-ui/core'
import { saveAsSvg } from '../../util/downloadHelper'
import TextWithClipBoard from '../controls/TextWithClipBoard/TextWithClipBoard'
import CheckBox from '../controls/CheckBox/CheckBox'
import PalettePreview from './PalettePreview'
import { isEqual } from 'lodash';

const checkedState = {
  GOOD: 1,
  BAD: 0,
  NONE: 2,
}

class ImagePreview extends Component {
  state = {
    checked: checkedState.NONE,
  }

  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object,
    showDivider: PropTypes.bool,
  }
  myRef = React.createRef()

  componentDidUpdate(prev) {
    if (prev.image !== this.props.image) {
      this.myRef.current.innerHTML = "";
      if (this.props.image) {
        this.myRef.current.appendChild(this.props.image.image)
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.image, this.props.image) 
    || !isEqual(nextProps.width, this.props.width)
    || !isEqual(nextState.checked, this.state.checked)
    ) {
      return true
    }
    return false
  }

  componentDidMount() {
    this.myRef.current.innerHTML = "";
    if (this.props.image) {
      this.myRef.current.appendChild(this.props.image.image)
    }
  }
  componentWillUnmount() {
    this.myRef.current.innerHTML = "";
  }

  saveSvg = () => {
    const name = this.props.image.name.slice(0, -4) +
      '_' +
      this.props.image.palette.name.replace(' ', '-') +
      '_' +
      this.props.image.palette.colorName.replace(' ', '-') +
      '.svg'
    saveAsSvg(this.props.image.image, name)
  }

  handleBadClick = checked => {
    const s = this.state.checked === checkedState.BAD ? checkedState.NONE : checkedState.BAD
    this.setState({
      checked: s
    })
  }

  handleGoodClick = event => {
    const s = this.state.checked === checkedState.GOOD ? checkedState.NONE : checkedState.GOOD
    this.setState({
      checked: s
    })
  }

  render() {
    const { className, image, width, showDivider, ...other } = this.props
    const palletesString = image.palette && image.palette.palette.toString()
    const isBadChecked = this.state.checked === checkedState.BAD
    const isGoodChecked = this.state.checked === checkedState.GOOD
    const isSmall =  width < 285

    return (
      <div className={css(styles.wrapper, className)} {...other}>
        <div className={css(className, styles.img)} style={{ width: width }} ref={this.myRef}></div>
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
              <CheckBox
                onChange={this.handleBadClick}
                aria-label="Vote as bad image"
                checked={isBadChecked}
                checkedIcon={<HighlightOff className={css(styles.paletteDiv)} />}
                icon={<HighlightOff className={css(styles.paletteDiv)} />} />
              <CheckBox
                aria-label="Vote as good image"
                onChange={this.handleGoodClick}
                checked={isGoodChecked}
                checkedIcon={<CheckCircle className={css(styles.paletteDiv, styles.greenColor)} />}
                icon={<CheckCircle className={css(styles.paletteDiv)} />} />
              <IconButton onClick={this.saveSvg} aria-label="Save SVG" >
                <SaveAlt className={css(styles.paletteDiv)} />
              </IconButton>
            </div>
          </div>
        )}
        {showDivider && (
          <div className={css(styles.line)} />
        )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
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
  buttonsBreak: {
    marginLeft: -12,
    marginTop: 20,
    display: 'flex',
    justifyContent:' space-between',
    marginBottom: -18
  },
  greenColor: {
    color: '#27ae60',
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
  img: {
    margin: '0!important'
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
