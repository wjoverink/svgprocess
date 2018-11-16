const copyToClipBoard = ( text ) => {
  const copyTextBox = document.createElement("input")
  document.body.appendChild(copyTextBox);
  copyTextBox.value = text
  copyTextBox.select()
  document.execCommand("copy")
  document.body.removeChild(copyTextBox)
}

export {
  copyToClipBoard
}