import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import provideScrollPosition from 'react-provide-scroll-position'
import Header from '../Header/Header'
import LeftMenu from '../LeftMenu/LeftMenu';
import MainContent from '../MainContent/MainContent'
import colorsJSON from '../../colorPalette/colorPalettes'

class MainPage extends Component {

  constructor(props) {
    super(props)

    const palettes = []
    colorsJSON.palettes.forEach(group => {
      group.colors.forEach(color => {
        color.palettes.forEach(palette => {
          palettes.push(palette)
          palette["colorName"] = color.name
          palette["groupName"] = group.name
        })
      })
    })

    this.state = {
      numberOfImages: 20,
      imagesWidth: 457,
      palettes: palettes,
      refresh: false
    }
  }

  onWidthChange = width => {
    this.setState({
      imagesWidth: width,
    })
  }

  onTotalImgChange = total => {
    this.setState({
      numberOfImages: total,
    })
  }

  onPaletteChange = palettes => {
    this.setState({
      palettes,
    })
  }

  onRefreshClick = event => {
    this.setState(state => (
      { refresh: !state.refresh }
    ))
  }

  render() {
    const { numberOfImages, imagesWidth, palettes, refresh } = this.state
    return (
      <div className={css(styles.mainWrapper)}>
        <Header className={styles.header}></Header>
        <div className={css(styles.rWrapper)}>
          <LeftMenu
            numberOfImages={numberOfImages}
            imagesWidth={imagesWidth}
            onWidthChange={this.onWidthChange}
            onTotalImgChange={this.onTotalImgChange}
            onPaletteChange={this.onPaletteChange}
            onRefreshClick={this.onRefreshClick}
            className={styles.leftmenu} />
          <MainContent 
            refresh={refresh}
            palettes={palettes}
            numberOfImages={numberOfImages}
            imagesWidth={imagesWidth}
            className={styles.mainContent} />
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  leftmenu: {
    width: 250
  },
  mainContent: {
    flex: 1
  },
  header: {
    height: 170
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  rWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }
})

export default provideScrollPosition(MainPage)
