import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import { font, colors } from '../../styles/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

class LeftItem extends Component {
  static propTypes = {
    className: PropTypes.object,
    wrapperClassName: PropTypes.object,
    title: PropTypes.string,
    Icon: PropTypes.any,
    onClick: PropTypes.func
  }

  getIcon = (Icon) => {
    return <Icon />
  }

  render() {
    const { className, children, icon, title, wrapperClassName, onClick } = this.props
    
    let ComponentProp = 'div';
    const inputProps = {
    }
    if (onClick) {
      ComponentProp = Button
      inputProps.component ="span"
    }
    return (
      <ComponentProp {...inputProps} 
        onClick={onClick} 
        className={css(styles.cWrapper, onClick && styles.button, className, !children && styles.noChildren)}>
        <div className={css(styles.header)}> 
          {icon && (this.getIcon(icon))}
          <span className={css(styles.title)}>{title}</span>
        </div>
        {children && (<div className={css(styles.children, wrapperClassName)}>{children}</div>)}
      </ComponentProp>
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
  },
  button:{
    marginLeft: -16,
    ':nth-child(1n)>span': {
      justifyContent: 'flex-start'
    },
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  noChildren:{
    marginBottom: 10,
  },
  children: {
    marginLeft: 51,
    marginTop: 40,
    ':nth-child(1n)>*': {
      marginBottom: 20,
    }
  },
  title: {
    textTransform: 'uppercase',
    marginLeft: 26
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default LeftItem
