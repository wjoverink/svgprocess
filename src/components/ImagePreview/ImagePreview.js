import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'

class ImagePreview extends Component {
  static propTypes = {
    image: PropTypes.any,
    className: PropTypes.object,
  }
  myRef = React.createRef()
  
  componentDidUpdate(){
    this.myRef.current.innerHTML = "";
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image.image)
    }
  }
  componentDidMount(){
    this.myRef.current.innerHTML = "";
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image.image)
    }
  }
  componentWillUnmount(){
    this.myRef.current.innerHTML = "";
  }

  render() {
    const {className, image, width, ...other} = this.props
    return (
        <div className={css(styles.wrapper, className)} {...other}>
          <div className={css(className, styles.img)} style={{width:width}} ref={this.myRef}></div>
          {image.palette && (<div className={css(styles.labelClass)}>
            <span>{image.palette.name}</span>
            <span style={{color:image.palette.palette[0]}}>{image.palette.colorName}</span>
          </div>)}
        </div>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  img:{
    margin:'0!important'
  },
  labelClass:{
    color:'darkgray',
    fontSize: '12px',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:' space-between'
    // lineHeight: '1.46429em'
  }
})

export default ImagePreview
