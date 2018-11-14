import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { uniqueId } from 'lodash'

class FileUpload extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.id = uniqueId("id-")
  }
  fileChangedHandler = (event) => {
    this.props.onChange(event.target.files)
  }

  render() {
    const { ...other } = this.props
    return (
      <React.Fragment>
        <input 
          style={{ display: 'none' }} 
          id={this.id} 
          type="file" 
          accept=".svg" 
          multiple="multiple" 
          onChange={this.fileChangedHandler} />
        <label { ...other } htmlFor={this.id}>
          <Button className={css(styles.button)} variant="outlined" component="span">
            Upload
          </Button>
        </label>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    width: 185,
    height: 44,
    border: 'solid 1px #dfe3e9',
    backgroundColor: '#ffffff'
  }
})


export default FileUpload
