import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { isFunction } from 'lodash'

const muiStyles = theme => ({
  root: {
    // Some CSS
    color: 'white!important',
  },
  rootLabel: {
    // Some CSS
    color: '#bbb!important',
  },
  focused: {
    // Some CSS
    color: 'white!important',
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid gray!important',
    },
    '&:before': {
      borderBottom: '2px solid gray!important',
    },
  },
});

class InputTextField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    value: this.props.value,
  }

  handleChange = event => {
    clearTimeout(this.changeTimeout)

    this.setState({
      value: event.target.value,
    })

    if (isFunction(this.props.onChange)) {
      this.changeTimeout = setTimeout(this.props.onChange.bind(this, event.target.value), 500);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      })
    }
  }

  render() {
    const { classes, ...other } = this.props
    return (
      <TextField
        InputLabelProps={{
          classes: {
            root: classes.rootLabel,
            focused: classes.cssFocused
          },
        }}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
        color="secondary" {...other}
        value={this.state.value}
        onChange={this.handleChange}></TextField>
    )
  }
}

export default withStyles(muiStyles)(InputTextField);
