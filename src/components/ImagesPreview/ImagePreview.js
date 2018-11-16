import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import SaveAlt from '@material-ui/icons/SaveAlt'
import { IconButton } from '@material-ui/core'
import { saveAsSvg } from '../../util/downloadHelper'
import TextWithClipBoard from '../controls/TextWithClipBoard/TextWithClipBoard'
import PalettePreview from './PalettePreview'
import ImageControl from './ImageControl'
import VoteControl from './VoteControl'

class ImagePreview extends PureComponent {
  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object,
    showDivider: PropTypes.bool,
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

  render() {
    const { className, image, width, showDivider, ...other } = this.props
    const palletesString = image.palette && image.palette.palette.toString()
    const isSmall =  width < 285

    return (
      <div className={css(styles.wrapper, className)} {...other}>
        <ImageControl width={width} image={image}/>
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
