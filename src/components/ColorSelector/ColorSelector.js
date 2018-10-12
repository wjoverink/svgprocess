import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import MultiSelectDropDown from '../MultiSelectDropDown/MultiSelectDropDown'
import { find, filter, isFunction } from 'lodash'

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
    selectedPalettes: [],
    selectedGroups: [],
    selectedTypes: [],
    selectedColors: [],
  }

  onChange = () => {
    if (isFunction(this.props.onChange)){
      this.props.onChange(this.state.selectedPalettes)
    }
  }

  handlegroups = items => {
    let groups = filter(this.props.colorsJSON.palettes, c => items.includes(c.name) )
    if (items.length===0){
      groups = this.props.colorsJSON.palettes
    }
    const colors = []
    const selectedPalettes = []
    groups.forEach(group => {
      group.colors.forEach(color => {
        colors.push(color.name)
        color.palettes.forEach(palette => {
          selectedPalettes.push(palette)
        })
      })
    });
   
    if (items.length===0){
      this.setState({selectedGroups:[], groups, colors}, ()=>{
        if (this.state.selectedTypes.length>0){
          this.handlePalettes(this.state.selectedTypes)
        } else if (this.state.selectedColors.length>0){
          this.handleColors(this.state.selectedColors)
        } else {
          this.setState({ groups, colors, selectedPalettes }, this.onChange)
        }
      })
    } else {
      this.setState({ groups, colors, selectedPalettes, selectedGroups:items }, this.onChange)
    }
   
  }

  handleColors = items => {
    const paletteNames = []
    const selectedPalettes = []
    const groups = []
    let stateGroups = this.state.groups
    if (this.state.selectedGroups.length===0){
      stateGroups = this.props.colorsJSON.palettes
    }
    stateGroups.forEach(group => {
      group.colors.forEach(color => {
        if (items.includes(color.name) || items.length===0){
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
    //this.props.colorsJSON.palettes
    if (items.length===0){
      this.setState({selectedColors:[], paletteNames}, () => {
        if (this.state.selectedTypes.length>0){
          this.handlePalettes(this.state.selectedTypes)
        } else if (this.state.selectedGroups.length>0){
          this.handlegroups(this.state.selectedGroups)
        } else {
          this.setState({ paletteNames, selectedPalettes, groups:this.props.colorsJSON.palettes }, this.onChange)
        }
      })
    } else {
       const newState = { selectedColors:items, paletteNames, selectedPalettes }
      if (this.state.selectedGroups.length===0){
        newState["groups"] = groups
      }
      this.setState(newState, this.onChange)
    }
  }

  handlePalettes = (items) => {
    const selectedPalettes = []
    const groups = []
    let stateGroups = this.state.groups
    if (this.state.selectedGroups.length===0){
      stateGroups = this.props.colorsJSON.palettes
    }
    stateGroups.forEach(group => {
      group.colors.forEach(color => {
        color.palettes.forEach(palette => {
          if (items.includes(palette.name) || items.length===0){
            groups.push(group)
            selectedPalettes.push(palette)
          }
        })
      })
    })
    if (items.length===0){
      this.setState({selectedTypes:[]}, () => {
        if (this.state.colors.length>0){
          this.handleColors(this.state.colors)
        } else if (this.state.selectedGroups.length>0){
          this.handlegroups(this.state.selectedGroups)
        } else {
          this.setState({ selectedPalettes, groups:this.props.colorsJSON.palettes }, this.onChange)
        }
      })
    } else {
      const newState = { selectedTypes: items, selectedPalettes }
      if (this.state.selectedGroups.length===0){
        newState["groups"] = groups
      }
      this.setState(newState, this.onChange)
    }
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
