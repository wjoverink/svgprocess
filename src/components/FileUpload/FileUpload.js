import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FileUpload extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  }
  fileChangedHandler = (event) => {
    this.props.onChange(event.target.files)
  }

  render() {
    const {...other} = this.props
    return (
      <input type="file" accept=".svg" multiple="multiple" {...other} onChange={this.fileChangedHandler}></input>      
    )
  }
}

export default FileUpload
