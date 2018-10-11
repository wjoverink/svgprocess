import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import MultiSelectDropDown from '../MultiSelectDropDown/MultiSelectDropDown'
import { find, isFunction } from 'lodash'

class ColorSelector extends Component {
  static propTypes = {
    className: PropTypes.object,
    items: PropTypes.array,
    onChange: PropTypes.func,
    colorsJSON: PropTypes.object,
  }

  state = {
    show: this.props.isOpen,
    paletteNames: [],
    colors: [],
    groups: this.props.colorsJSON.palettes,
    groupNames: [],
    selectedPalettes: []
  }

  onChange = () => {
    if (isFunction(this.props.onChange)){
      this.props.onChange(this.state.selectedPalettes)
    }
  }

  handlegroups = items => {
    const group = find(this.props.colorsJSON.palettes, c => items.includes(c.name) )
    const colors = []
    const selectedPalettes = []
    group.colors.forEach(color => {
      colors.push(color.name)
      color.palettes.forEach(palette => {
        selectedPalettes.push(palette)
      })
    })

    this.setState({ groups:[group], colors, selectedPalettes }, this.onChange)
  }

  handleColors = items => {
    const paletteNames = []
    const selectedPalettes = []
    const groups = []
    this.state.groups.forEach(group => {
      group.colors.forEach(color => {
        if (items.includes(color.name)){
          groups.push(group)
          color.palettes.forEach(palette => {
            selectedPalettes.push(palette)
            if (!paletteNames.includes(palette.name)){
              paletteNames.push(palette.name)
            }
          })
        }
      })
    })      
    this.setState({ paletteNames, selectedPalettes, groups }, this.onChange)
  }

  handlePalettes = (items) => {
    const selectedPalettes = []
    const groups = []
    this.state.groups.forEach(group => {
      group.colors.forEach(color => {
        color.palettes.forEach(palette => {
          if (items.includes(palette.name)){
            groups.push(group)
            selectedPalettes.push(palette)
          }
        })
      })
    })
    
    this.setState({ selectedPalettes, groups }, this.onChange)
  }

  componentDidMount(){
    const groupNames = []
    const paletteNames = []
    const selectedPalettes = []
    const colors = []
    this.props.colorsJSON.palettes.forEach(group => {
      groupNames.push(group.name)
      group.colors.forEach(color => {
          colors.push(color.name)
          color.palettes.forEach(palette => {
            selectedPalettes.push(palette.palette)
            if (!paletteNames.includes(palette.name)){
              paletteNames.push(palette.name)
            }
          })
      })
    })     
    this.setState({ groupNames, selectedPalettes, colors, paletteNames })
  }

  render() {
    const {className} = this.props
   
    
    return (
      <div className={css(styles.cWrapper, className)}>
        <MultiSelectDropDown 
          className={styles.multiSelectDropDown} 
          helperText={'Color Group'} 
          label={'color'} 
          onChange={this.handlegroups}
          items={this.state.groupNames}/>
        <MultiSelectDropDown 
          className={styles.multiSelectDropDown} 
          helperText={'Main Color'} 
          onChange={this.handleColors}
          label={'color'} 
          items={this.state.colors}/>
        <MultiSelectDropDown 
          className={styles.multiSelectDropDown} 
          helperText={'Palette'} 
          onChange={this.handlePalettes}
          label={'palette'} 
          items={this.state.paletteNames}/>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  cWrapper: {
  },
  multiSelectDropDown: {
    marginLeft:10
  }
})

export default ColorSelector
