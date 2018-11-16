import { css, StyleSheet } from 'aphrodite/no-important'
import React, { PureComponent } from 'react'
import { font, colors } from '../../styles/styles'
import PropTypes from 'prop-types'
import LeftItem from './LeftItem'
import Autorenew from '@material-ui/icons/Autorenew'
import ColorLens from '@material-ui/icons/ColorLens'
import Settings from '@material-ui/icons/Settings'
import ColorSelector from '../ColorSelector/ColorSelector'
import colorsJSON from '../../colorPalette/colorPalettes'
import { isFunction, isEmpty, isNumber } from 'lodash'
import InputTextField from '../controls/InputTextField/InputTextField';

class LeftMenu extends PureComponent {
  static propTypes = {
    className: PropTypes.object,
    imagesWidth: PropTypes.number,
    numberOfImages: PropTypes.number,
    onWidthChange: PropTypes.func,
    onTotalImgChange: PropTypes.func,
    onPaletteChange: PropTypes.func,
    onRefreshClick: PropTypes.func,
  }

  handleTotalImgChange = total => {
    if (isFunction(this.props.onTotalImgChange)) {
      this.props.onTotalImgChange(this.toInt(total))
    }
  }

  toInt = value => {
    const imgWidth = isEmpty(value) ? 0 : parseInt(value)
    return isNumber(imgWidth) ? imgWidth : 0
  }

  handleWidthChange = width => {
    if (isFunction(this.props.onWidthChange)) {
      this.props.onWidthChange(this.toInt(width))
    }
  }

  handleColorSelectorChange = palettes => {
    if (isFunction(this.props.onPaletteChange)) {
      this.props.onPaletteChange(palettes)
    }
  }

  handleRefreshClick = event => {
    if (isFunction(this.props.onRefreshClick)) {
      this.props.onRefreshClick(event)
    }
  }

  render() {
    const { className, imagesWidth, numberOfImages } = this.props

    return (
      <div className={css(styles.cWrapper, styles.controlsWrapper, className)}>
        <LeftItem onClick={this.handleRefreshClick} icon={Autorenew} title={'refresh'} />
        <div className={css(styles.divider)} />
        <LeftItem icon={Settings} title={'settings'}>
          <InputTextField
            label="img per SVG"
            value={numberOfImages}
            onChange={this.handleTotalImgChange}
          />
          <InputTextField
            label="img width"
            value={imagesWidth}
            onChange={this.handleWidthChange}
          />
        </LeftItem>
        <LeftItem wrapperClassName={styles.childrenWrapper} icon={ColorLens} title={'palette'}>
          <ColorSelector 
            colorsJSON={colorsJSON} 
            onChange={this.handleColorSelectorChange}
            />
        </LeftItem>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  childrenWrapper: {
    marginTop: 20,
  },
  cWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20
  },
  controlsWrapper: {
    backgroundColor: colors.backgroundColor,
    position: 'relative',
    borderBottom: '1px solid rgba(225, 0, 80, 0.5)',
    boxSizing: 'border-box',
    alignItems: 'stretch'
  },
  divider: {
    width: 210,
    height: 1,
    marginBottom: 20,
    backgroundColor: '#4a4a4a'
  }
})

export default LeftMenu
