import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import SaveAlt from '@material-ui/icons/SaveAlt'
import CheckCircle from '@material-ui/icons/CheckCircle'
import HighlightOff from '@material-ui/icons/HighlightOff'

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

  render() {
    const { className, image, width, showDivider, ...other } = this.props
    return (
      <div className={css(styles.wrapper, className)} {...other}>
        <div className={css(className, styles.img)} style={{ width: width }} ref={this.myRef}></div>
        {image.palette && (<div className={css(styles.labelClass)}>
          <span>{'color: ' + image.palette.colorName}</span>
          <span>{'palette: ' + image.palette.name}</span>
          <span>{'filename: ' + image.name}</span>
          {/* style={{color:image.palette.palette[0]}} */}
        </div>)}
        {image.palette && (
          <div className={css(styles.pColorWrapper)}>
            {image.palette.palette.map((item, index) => (
              <div title={item} style={{ backgroundColor: item }} className={css(styles.paletteDiv)}></div>
            ))}
            <div className={css(styles.buttons)}>
              <HighlightOff className={css(styles.paletteDiv)} />
              <CheckCircle className={css(styles.paletteDiv, styles.middleButton)} />
              <SaveAlt className={css(styles.paletteDiv)} />
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
  buttons:{
    marginLeft: 'auto'
  },
  paletteDiv: {
    width: 28,
    height: 28
  },
  middleButton:{
    margin: '0 25px',
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
    flexDirection: 'column',
    textTransform: 'uppercase'
    // lineHeight: '1.46429em'
  }
})

export default ImagePreview
