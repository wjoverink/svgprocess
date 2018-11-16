import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import PropTypes from 'prop-types'
import { isFunction } from 'lodash'
import { FormControlLabel, Checkbox } from '@material-ui/core'

class CheckBox extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
  }

  state = {
    checked: this.props.checked,
  }

  handleChange = event => {
    this.setState({ checked: event.target.checked })
    if (isFunction(this.props.onChange)) {
      this.props.onChange(event.target.checked)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({
        checked: this.props.checked,
      })
    }
  }

  render() {
    const { icon, checkedIcon, label, ...other } = this.props
    const { checked } = this.state
    return (
      <React.Fragment>
        {label && (
          <FormControlLabel
            className={css(styles.button)}
            control={
              <Checkbox
                checked={checked}
                onChange={this.handleChange}
                icon={icon}
                checkedIcon={checkedIcon} {...other} />
            }
            {...other}
            label={label}
          />
        )}
        {!label && (
          <Checkbox
            checked={checked}
            className={css(styles.button)}
            onChange={this.handleChange}
            icon={icon}
            checkedIcon={checkedIcon} {...other} />
        )}
      </React.Fragment>

    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 0
  }
})


export default CheckBox
