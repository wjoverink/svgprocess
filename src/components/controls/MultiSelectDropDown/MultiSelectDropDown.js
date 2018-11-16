import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import { uniqueId, isFunction } from 'lodash'

const muiStyles = theme => ({
  root: {
    // Some CSS
    color: 'white',
  },
  rootHelperText: {
    // Some CSS
    color: '#bbb',
  },
  select: {
    // Some CSS
    color: 'white',
  },
  icon: {
    // Some CSS
    color: 'white',
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#bbb',
    },
    color: '#bbb',
  },
  cssFocused: {},
  underline: {
    '&:after': {
      borderBottom: '2px solid gray!important',
    },
    '&:before': {
      borderBottom: '2px solid gray!important',
    },
  },
});

class MultiSelectDropDown extends PureComponent {
  static propTypes = {
    className: PropTypes.object,
    items: PropTypes.array,
    selectedItems: PropTypes.array,
    label: PropTypes.string,
    helperText: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    show: this.props.isOpen,
    selectedItems: this.props.selectedItems || []
  }

  handleChange = event => {
    this.setState({ selectedItems: event.target.value })
    if (isFunction(this.props.onChange)) {
      this.props.onChange(event.target.value)
    }
  }

  render() {
    const { className, items, label, helperText, classes } = this.props
    const id = uniqueId('select-multiple_')
    return (
      <FormControl className={css(styles.formControl, className)}>
        {label && (<InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          htmlFor={id}>{label}</InputLabel>)}
        <Select
          multiple
          displayEmpty
          classes={{
            icon: classes.icon,
          }}
          value={this.state.selectedItems}
          onChange={this.handleChange}
          input={<Input
            classes={{
              root: classes.root,
              underline: classes.underline,
            }}
            id={id} />}
        // MenuProps={MenuProps}
        >
          {items.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText
          classes={{
            root: classes.rootHelperText,
          }}>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}

const styles = StyleSheet.create({
  formControl: {
    minWidth: 100,
    // maxWidth: 100,
  }
})

export default withStyles(muiStyles)(MultiSelectDropDown);
