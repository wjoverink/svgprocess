import React, { PureComponent } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import PropTypes from 'prop-types'
import { copyToClipBoard } from '../../../util/copyToClipBoard'
import { omit } from 'lodash'

class TextWithClipBoard extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    clipBoardText: PropTypes.string,
    className: PropTypes.object,
  }

  copyToClipBoard = () => {
    copyToClipBoard(this.props.clipBoardText || this.props.text || this.props.children)
  }

  render() {
    const { text, className, children, ...other } = omit(this.props, 'clipBoardText')
    return (
      <span
        className={css(styles.labelClass, className)}
        {...other}
        onClick={this.copyToClipBoard}>
        {children || text}
      </span>
    )
  }
}

const styles = StyleSheet.create({
  labelClass: {
    cursor: 'pointer'
  },
  hiddenTextBox: {
    position: 'absolute',
    left: -9999
  },
})

export default TextWithClipBoard
