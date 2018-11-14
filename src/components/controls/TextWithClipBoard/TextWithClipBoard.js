import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import PropTypes from 'prop-types'
import { copyToClipBoard } from '../../../util/copyToClipBoard'
import { omit } from 'lodash'

class TextWithClipBoard extends Component {
  static propTypes = {
    text: PropTypes.string,
    clipBoardText: PropTypes.string,
    className: PropTypes.object,
  }
  copyTextBox = React.createRef()

  copyToClipBoard = () => {
    copyToClipBoard(this.props.clipBoardText || this.props.text || this.props.children, this.copyTextBox.current)
  }

  render() {
    const { text, className, children, ...other } = omit(this.props, 'clipBoardText')
    return (
      <React.Fragment>
        <input ref={this.copyTextBox} className={css(styles.hiddenTextBox)} type="text"></input>
        <span
          className={css(styles.labelClass, className)}
          {...other}
          onClick={this.copyToClipBoard}>
          {children || text}
        </span>
      </React.Fragment>
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
