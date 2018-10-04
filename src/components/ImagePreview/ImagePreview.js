import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImagePreview extends Component {
  static propTypes = {
    image: PropTypes.any,
  }
  myRef = React.createRef()
  
  componentDidUpdate(){
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image)
    }
  }
  componentDidMount(){
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image)
    }
  }
  render() {
    const {image, ...other} = this.props
    
    return (
        <div {...other} ref={this.myRef}></div>
    )
  }
}

export default ImagePreview
