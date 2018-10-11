import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import { uniqueId, isFunction } from 'lodash'

class MultiSelectDropDown extends Component {
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
    selectedItems : this.props.selectedItems || []
  }

  handleChange = event => {
    this.setState({ selectedItems: event.target.value })
    if (isFunction(this.props.onChange)){
      this.props.onChange(event.target.value)
    }
  };

  render() {
    const {className, items, label, helperText} = this.props
    const id = uniqueId('select-multiple_')
    return (
      <FormControl className={css(styles.formControl, className)}>
        {label && (<InputLabel htmlFor={id}>{label}</InputLabel>)}
        <Select
          multiple
          displayEmpty
          value={this.state.selectedItems}
          onChange={this.handleChange}
          input={<Input id={id} />}
          // MenuProps={MenuProps}
        >
          {items.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
       {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}

const styles = StyleSheet.create({
  formControl:{
    minWidth: 100,
    maxWidth: 100,
  }
})

export default MultiSelectDropDown
