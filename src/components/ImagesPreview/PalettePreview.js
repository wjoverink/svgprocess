import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import Done from '@material-ui/icons/Done'
import TextWithClipBoard from '../controls/TextWithClipBoard/TextWithClipBoard'
import contrast from 'get-contrast'
import isEqual from 'lodash'

class PalettePreview extends Component {
  static propTypes = {
    usedColors: PropTypes.array,
    palette: PropTypes.array,
    className: PropTypes.object,
    showDivider: PropTypes.bool,
  }

  shouldComponentUpdate(nextProps, nextState){
    if (!isEqual(nextProps.palette, this.props.palette) || !isEqual(nextProps.usedColors, this.props.usedColors)){
      return true
    }
    return false
  }

  render() {
    const { palette, usedColors } = this.props

    return (
      <React.Fragment>
        {palette && palette.map((item, index) => (
          <TextWithClipBoard
            clipBoardText={item}
            key={item + index}
            title={item}
            style={{ backgroundColor: item }}
            className={styles.paletteDiv}>
            {usedColors.includes(item) && (
              <Done className={css(styles.doneIcon, contrast.ratio(item, '#ffffff') < 2 && styles.doneIconBlack)} />
            )}
          </TextWithClipBoard>
        ))}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

export default PalettePreview
