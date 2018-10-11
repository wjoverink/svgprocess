import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Settings from '@material-ui/icons/Settings'

class SettingsMenu extends Component {
  static propTypes = {
    className: PropTypes.object,
    iconClass: PropTypes.object,
    children: PropTypes.any,
    isRight: PropTypes.bool,
    isOpen: PropTypes.bool,
    icon: PropTypes.any,
  }

  state = {
    show: this.props.isOpen,
  }

  handleClickAdv = event => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const {classPanel, className, iconClass, children, isRight, icon} = this.props
    const NewIcon = icon
    const {show} = this.state
    return (
      <div className={css(className)}>
          {show && !isRight && (<div className={css(styles.cWrapper, classPanel)}>
           {children}
          </div>)}
          <IconButton className={css(iconClass)} onClick={this.handleClickAdv} color="secondary">
            {!show && !icon && (<Settings />)}
            {!show && icon && (<NewIcon />)}
            {show && !isRight && (<KeyboardArrowLeft />)}
            {show && isRight && (<KeyboardArrowRight />)}
          </IconButton>
          {show && isRight && (<div className={css(styles.cWrapper, classPanel)}>
           {children}
          </div>)}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  cWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    ':nth-child(1n)>*': {
      marginRight: 20,
      display: 'flex'
    },
  }
})

export default SettingsMenu
