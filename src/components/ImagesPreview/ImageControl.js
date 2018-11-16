import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'

class ImageControl extends PureComponent {
  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object
  }
  myRef = React.createRef()

  componentDidUpdate(prev) {
    if (prev.image !== this.props.image) {
      this.myRef.current.innerHTML = "";
      if (this.props.image) {
        this.myRef.current.appendChild(this.props.image.image)
      }
    }
  }

  componentDidMount() {
    this.myRef.current.innerHTML = "";
    if (this.props.image) {
      this.myRef.current.appendChild(this.props.image.image)
    }
  }
  componentWillUnmount() {
    this.myRef.current.innerHTML = "";
  }

  render() {
    const { className, width } = this.props

    return (
      <div className={css(className, styles.img)} style={{ width: width }} ref={this.myRef}></div>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    margin: '0!important'
  },
})

export default ImageControl
