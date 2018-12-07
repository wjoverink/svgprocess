import { css, StyleSheet } from 'aphrodite/no-important'
import React, { Component } from 'react'
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
      imagesWidth: 471,
      palettes: palettes,
      refresh: false
    }

    this.mainContentRef= React.createRef()
  }

  updateDimensions = () => {
    const mcRect = this.mainContentRef.current.mainContentRef.current.getBoundingClientRect()
    const newWidth =  Math.round((mcRect.width - 256) / 3)
    this.setState({
      imagesWidth: newWidth
    })
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    setTimeout(this.updateDimensions, 200) //TODO
  }

  componentWillUnmount = () =>  {
      window.removeEventListener("resize", this.updateDimensions);
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
            ref={this.mainContentRef}
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

export default MainPage
