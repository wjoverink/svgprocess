import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import { ReactComponent as KonversedLogo }  from '../../images/konversed-logo.svg'
import { ReactComponent as Logo }  from '../../images/group-30.svg'
import { font, colors} from '../../styles/styles'
import PropTypes from 'prop-types'

class Header extends Component {
  static propTypes = {
    className: PropTypes.object,
  }

  render() {
    const { className } = this.props

    return (
      <div className={css(styles.cWrapper, styles.controlsWrapper, className)}>
        <KonversedLogo />
        <div className={css(styles.cWrapper, styles.middle)}>
          <div className={css(styles.icon)}></div>
          <div className={css(styles.line)}></div>
          <header className={css(styles.labelOriginals, styles.header)}>
            {'Piñata Factory'}
          </header>
        </div>
        <Logo/>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    fontSize: 28,
  },
  labelOriginals: {
    color: 'white',
   ...font
  },
  cWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlsWrapper: {
    padding: '0px 60px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundColor,
    position: 'relative',
  },
  middle: {
    marginRight: 'auto',
    paddingLeft: 148
  },
  line: {
    width: 1,
    height: 27,
    border: 'solid 1px #979797',
    borderWidth: '0 1px 0 0',
    margin: '0 16px'
  },
  icon: {
    width: 20,
    height: 20,
    backgroundImage: 'linear-gradient(to top, #ff2967, #ff5d39)'
  }
})

export default Header
