import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import SaveAlt from '@material-ui/icons/SaveAlt'
import CheckCircle from '@material-ui/icons/CheckCircle'
import HighlightOff from '@material-ui/icons/HighlightOff'
import { IconButton } from '@material-ui/core';
import { copyToClipBoard } from '../../util/copyToClipBoard';
import { saveAsSvg } from '../../util/downloadHelper';
import TextWithClipBoard from '../controls/TextWithClipBoard/TextWithClipBoard';

class ImagePreview extends Component {
  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object,
    showDivider: PropTypes.bool
  }
  myRef = React.createRef()
  
  componentDidUpdate() {
    this.myRef.current.innerHTML = "";
    if (this.props.image) {
      this.myRef.current.appendChild(this.props.image.image)
    }
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
    const name =  this.props.image.name.slice(0,-4) + 
      '_' + 
      this.props.image.palette.name.replace(' ','-') + 
      '_' + 
      this.props.image.palette.colorName.replace(' ','-') +
      '.svg'
    saveAsSvg(this.props.image.image, name)
}

  render() {
    const { className, image, width, showDivider, ...other } = this.props
    const palletesString = image.palette && image.palette.palette.toString()
    return (
      <div className={css(styles.wrapper, className)} {...other}>
        <div className={css(className, styles.img)} style={{ width: width }} ref={this.myRef}></div>
        {image.palette && (<div className={css(styles.labelClass)}>
          <TextWithClipBoard clipBoardText={image.palette.colorName}>
            {'color: ' + image.palette.colorName}
          </TextWithClipBoard>
          <TextWithClipBoard clipBoardText={image.palette.name}>
            {'color: ' + image.palette.name}
          </TextWithClipBoard>
          <TextWithClipBoard clipBoardText={image.name}>
            {'color: ' + image.name}
          </TextWithClipBoard>
        </div>)}
        {image.palette && (
          <div className={css(styles.pColorWrapper)}>
            {image.palette.palette.map((item, index) => (
               <TextWithClipBoard 
                clipBoardText={palletesString}
                onClick={copyToClipBoard.bind(this, palletesString)}
                key={item}
                title={item}
                style={{ backgroundColor: item }}
                className={styles.paletteDiv}
                />
            ))}
            <div className={css(styles.buttons)}>
              <IconButton aria-label="Vote as bad image" >
                <HighlightOff className={css(styles.paletteDiv)} />
              </IconButton>
              <IconButton className={css(styles.middleButton)} aria-label="Vote as good image" >
                <CheckCircle className={css(styles.paletteDiv)} />
              </IconButton>
              <IconButton onClick={this.saveSvg}  aria-label="Save SVG" >
                <SaveAlt className={css(styles.paletteDiv)}/>
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
  buttons: {
    marginLeft: 'auto',
    ':nth-child(1n)>*': {
      marginTop: '-23px'
    },
    ':nth-child(1n)>*:last-child': {
      marginRight: '-10px'
    }
  },
  paletteDiv: {
    width: 28,
    height: 28,
    cursor: 'pointer'
  },
  middleButton: {
    marginRight: 5,
    marginLeft: 5,
    color: '#27ae60',
  },
  img: {
    margin: '0!important'
  },
  line: {
    height: 1,
    marginTop: 31,
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
