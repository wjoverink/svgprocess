import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
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
      // <input type="file" accept=".svg" multiple="multiple" {...other} onChange={this.fileChangedHandler}></input>  
      <label className={css(styles.button)}  {...other}>
        <input style={{ display: 'none'}} type="file" accept=".svg" multiple="multiple" onChange={this.fileChangedHandler}/>
        <span className={css(styles.span)}>Upload</span>
      </label>    
    )
  }
}

const styles = StyleSheet.create({
  span:{
    // color: 'rgb(225, 0, 80)',
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    fontSize: '0.875rem',
    lineHeight: '1.4em',
    textTransform: 'uppercase'
  },
  button: {
    padding: '12px 16px 9px 16px',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    lineHeight: '1.4em',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    textTransform: 'uppercase',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    userSelect: 'none',
    alignItems: 'center',
    textAlign: 'center',
    width: 185,
    height: 44,
    borderRadius: 4,
    border: 'solid 1px #dfe3e9',
    backgroundColor: '#ffffff'
  }
})


export default FileUpload
