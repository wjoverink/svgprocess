import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImagePreview extends Component {
  static propTypes = {
    image: PropTypes.any,
  }
  myRef = React.createRef()
  
  componentDidUpdate(){
    this.myRef.current.innerHTML = "";
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image)
    }
  }
  componentDidMount(){
    this.myRef.current.innerHTML = "";
    if (this.props.image){
      this.myRef.current.appendChild(this.props.image)
    }
  }
  componentWillUnmount(){
    this.myRef.current.innerHTML = "";
  }

  render() {
    const {image, ...other} = this.props
    
    return (
        <div {...other} ref={this.myRef}></div>
    )
  }
}

export default ImagePreview
