import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import CheckCircle from '@material-ui/icons/CheckCircle'
import HighlightOff from '@material-ui/icons/HighlightOff'
import CheckBox from '../controls/CheckBox/CheckBox'

const checkedState = {
  GOOD: 1,
  BAD: 0,
  NONE: 2,
}

class VoteControl extends PureComponent {
  state = {
    checked: checkedState.NONE,
  }

  handleBadClick = checked => {
    const s = this.state.checked === checkedState.BAD ? checkedState.NONE : checkedState.BAD
    this.setState({
      checked: s
    })
  }

  handleGoodClick = event => {
    const s = this.state.checked === checkedState.GOOD ? checkedState.NONE : checkedState.GOOD
    this.setState({
      checked: s
    })
  }

  render() {
    const isBadChecked = this.state.checked === checkedState.BAD
    const isGoodChecked = this.state.checked === checkedState.GOOD

    return (
      <React.Fragment>
        <CheckBox
          onChange={this.handleBadClick}
          aria-label="Vote as bad image"
          checked={isBadChecked}
          checkedIcon={<HighlightOff className={css(styles.paletteDiv)} />}
          icon={<HighlightOff className={css(styles.paletteDiv)} />} />
        <CheckBox
          aria-label="Vote as good image"
          onChange={this.handleGoodClick}
          checked={isGoodChecked}
          checkedIcon={<CheckCircle className={css(styles.paletteDiv, styles.greenColor)} />}
          icon={<CheckCircle className={css(styles.paletteDiv)} />} />
      </React.Fragment>


    )
  }
}

const styles = StyleSheet.create({
  greenColor: {
    color: '#27ae60',
  },
  paletteDiv: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export { checkedState }
export default VoteControl
