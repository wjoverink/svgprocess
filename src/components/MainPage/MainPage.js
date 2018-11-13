import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
import provideScrollPosition from 'react-provide-scroll-position'
import Header from '../Header/Header'
import LeftMenu from '../LeftMenu/LeftMenu';
import MainContent from '../MainContent/MainContent';


class MainPage extends Component {
  state = {
    numberOfImages: 20,
    imagesWidth: 457,
    palettes: []
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

  render() {
    const { numberOfImages, imagesWidth, palettes } = this.state
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
            className={styles.leftmenu} />
          <MainContent 
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
