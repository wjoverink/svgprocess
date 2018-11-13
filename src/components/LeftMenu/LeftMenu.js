import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import { font, colors } from '../../styles/styles'
import PropTypes from 'prop-types'
import LeftItem from './LeftItem'
import Autorenew from '@material-ui/icons/Autorenew'
import ColorLens from '@material-ui/icons/ColorLens'
import Settings from '@material-ui/icons/Settings'
import ColorSelector from '../ColorSelector/ColorSelector'
import colorsJSON from '../../colorPalette/colorPalettes'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import InputTextField from '../InputTextField/InputTextField';
import { isFunction } from 'lodash'

class LeftMenu extends Component {
  static propTypes = {
    className: PropTypes.object,
    imagesWidth: PropTypes.number,
    numberOfImages: PropTypes.number,
    onWidthChange: PropTypes.func,
    onTotalImgChange: PropTypes.func,
    onPaletteChange: PropTypes.func
  }

  handleTotalImgChange = total => {
    if (isFunction(this.props.onTotalImgChange)) {
      this.props.onTotalImgChange(total)
    }
  }

  handleWidthChange = width => {
    if (isFunction(this.props.onWidthChange)) {
      this.props.onWidthChange(width)
    }
  }

  handleColorSelectorChange = palettes => {
    if (isFunction(this.props.onPaletteChange)) {
      this.props.onPaletteChange(palettes)
    }
  }

  render() {
    const { className, imagesWidth, numberOfImages } = this.props

    return (
      <div className={css(styles.cWrapper, styles.controlsWrapper, className)}>
        <LeftItem icon={Autorenew} title={'refresh'}>
        </LeftItem>
        <div className={css(styles.divider)} />>
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
          {/* <FormControlLabel
            control={
              <Checkbox
                // checked={this.state.alwaysUseMainColor}
                // onChange={this.handleCheckboxClick}
              />
            }
            label="has main color"
          /> */}
        </LeftItem>
        <LeftItem icon={ColorLens} title={'palette'}>
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
  labelOriginals: {
    color: 'white',
    ...font
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
    boxSizing: 'border-box'
  },
  divider: {
    width: 210,
    height: 1,
    backgroundColor: '#4a4a4a'
  }
})

export default LeftMenu
