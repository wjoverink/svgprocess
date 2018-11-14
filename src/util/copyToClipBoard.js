const copyToClipBoard = ( text, copyTextBox) => {
  var copyText = copyTextBox
  copyText.value = text
  copyText.select();
  document.execCommand("copy");
}

export {
  copyToClipBoard
}