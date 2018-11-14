import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'
import ImagePreview from './ImagePreview'

class ImagesPreview extends Component {
  static propTypes = {
    images: PropTypes.any,
    imageClass: PropTypes.object,
    className: PropTypes.object,
    label: PropTypes.string,
    showEmpty: PropTypes.bool,
    imgWidth: PropTypes.number,
    showDivider: PropTypes.bool
  }


  render() {
    const { images, imageClass, labelClass, className, label, showEmpty, imgWidth, showDivider, ...other } = this.props

    return (
      <div className={css(styles.wrapper, className)} {...other}>
        {label && (<span className={css(styles.wrapper, labelClass)}>{label}: </span>)}
        <div className={css(styles.wrapper)}>
          {images.map((item, index) => (
            <ImagePreview
              showDivider={showDivider}
              width={imgWidth}
              className={{ ...imageClass }}
              key={"image" + index}
              image={item} />
          ))}
          {showEmpty && images.length === 0 && (<span className={css(styles.wrapper, labelClass)}>None</span>)}
        </div>
      </div>
    )
  }
}



const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    overflow: 'hidden'
  }
})

export default ImagesPreview
