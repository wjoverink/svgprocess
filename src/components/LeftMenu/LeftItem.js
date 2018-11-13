import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import { font, colors } from '../../styles/styles'
import PropTypes from 'prop-types'

class LeftItem extends Component {
  static propTypes = {
    className: PropTypes.object,
    wrapperClassName: PropTypes.object,
    title: PropTypes.string,
    Icon: PropTypes.any
  }



  getIcon = (Icon) => {
    return <Icon />
  }

  render() {
    const { className, children, icon, title, wrapperClassName } = this.props

    return (
      <div className={css(styles.cWrapper, className)}>
        <div className={css(styles.header)}> 
          {icon && (this.getIcon(icon))}
          <span>{title}</span>
        </div>
        <div className={css(styles.children, wrapperClassName)}>{children}</div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  cWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: colors.textOnBlack,
    fontSize: 14,
    // flex: 1
  },
  children: {
    marginLeft: 51,
    marginTop: 40,
    ':nth-child(1n)>*': {
      marginBottom: 20,
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ':nth-child(1n)>span': {
        textTransform: 'uppercase',
        marginLeft: 26
    }
  }
})

export default LeftItem
