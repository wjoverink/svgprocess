import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'aphrodite/no-important'
import MultiSelectDropDown from '../controls/MultiSelectDropDown/MultiSelectDropDown'
import { isFunction } from 'lodash'

class ColorSelector extends Component {
  static propTypes = {
    className: PropTypes.object,
    items: PropTypes.array,
    onChange: PropTypes.func,
    colorsJSON: PropTypes.object,
  }
  selectedPalettes = []
  state = {
    show: this.props.isOpen,

    paletteNames: [],
    groupNames: [],
    colorNames: [],

    groups: this.props.colorsJSON.palettes,

    selectedPalettes: [],

    selectedPaletteNames: [],
    selectedGroups: [],
    selectedTypes: [],
    selectedColors: [],
  }

  onChange = () => {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.selectedPalettes)
    }
  }

  getPalettes = () => {
    const groups = this.props.colorsJSON.palettes
    const groupNames = []
    const colorNames = []
    const paletteNames = []
    const selectedPalettes = []

    groups.forEach(group => {
      group.colors.forEach(color => {
        color.palettes.forEach(palette => {
          const incColors = this.state.selectedColors.includes(color.name)
          const incGroups = this.state.selectedGroups.includes(group.name)
          const incPaletteNames = this.state.selectedPaletteNames.includes(palette.name)
          const hasSelectedColors = this.state.selectedColors.length !== 0
          const hasSelectedGroups = this.state.selectedGroups.length !== 0
          const hasSelectedPaletteNames = this.state.selectedPaletteNames.length !== 0

          let a = false
          let b = false
          let c = false

          if (incGroups || (!hasSelectedColors && !hasSelectedPaletteNames)
            || (incColors && !hasSelectedPaletteNames)
            || (incPaletteNames && !hasSelectedColors)
            || (incColors && incPaletteNames)
          ) {
            if (!groupNames.includes(group.name)) {
              groupNames.push(group.name)
            }
            a = true
          }

          if (incColors || (!hasSelectedGroups && !hasSelectedPaletteNames)
            || (incGroups && !hasSelectedPaletteNames)
            || (incPaletteNames && !hasSelectedGroups)
            || (incGroups && incPaletteNames)
          ) {
            if (!colorNames.includes(color.name)) {
              colorNames.push(color.name)
            }
            b = true
          }

          if (incPaletteNames || (!hasSelectedGroups && !hasSelectedColors)
            || (incColors && !hasSelectedGroups)
            || (incGroups && !hasSelectedColors)
            || (incColors && incGroups)
          ) {
            if (!paletteNames.includes(palette.name)) {
              paletteNames.push(palette.name)
            }
            c = true
          }

          if (a && b && c) {
            selectedPalettes.push(palette)
          }
        })
      })
    })
    const state = {}
    if (this.state.groupNames.length !== groupNames.length) {
      state["groupNames"] = groupNames
    }

    if (this.state.colorNames.length !== colorNames.length) {
      state["colorNames"] = colorNames
    }

    if (this.state.paletteNames.length !== paletteNames.length) {
      state["paletteNames"] = paletteNames
    }
    this.selectedPalettes = selectedPalettes

    this.setState(state, this.onChange)
  }

  handlegroups = items => {
    this.setState({ selectedGroups: items }, this.getPalettes)
  }

  handleColors = items => {
    this.setState({ selectedColors: items }, this.getPalettes)
  }

  handlePalettes = items => {
    this.setState({ selectedPaletteNames: items }, this.getPalettes)
  }

  componentDidMount() {
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
          if (!paletteNames.includes(palette.name)) {
            paletteNames.push(palette.name)
          }
        })
      })
    })
    this.selectedPalettes = selectedPalettes
    this.setState({ groupNames, colorNames: colors, paletteNames })
  }

  render() {
    const { paletteNames, groupNames, colorNames } = this.state

    const pNames = paletteNames.sort()
    const gNames = groupNames.sort()
    const cNames = colorNames.sort()
    
    return (
      <React.Fragment>
        <MultiSelectDropDown
          className={styles.multiSelectDropDown}
          helperText={'Color Group'}
          label={'color'}
          onChange={this.handlegroups}
          items={gNames} />
        <MultiSelectDropDown
          className={styles.multiSelectDropDown}
          helperText={'Main Color'}
          onChange={this.handleColors}
          label={'color'}
          items={cNames} />
        <MultiSelectDropDown
          className={styles.multiSelectDropDown}
          helperText={'Palette'}
          onChange={this.handlePalettes}
          label={'palette'}
          items={pNames} />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  multiSelectDropDown: {
    width: '100%'
  }
})

export default ColorSelector
