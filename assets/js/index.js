(function() {
  document.addEventListener('mouseup', getSelectedText);

  function getSelectedText() {
    const { startOffset, endOffset } = window.getSelection().getRangeAt(0);
    //if block true means user has highlighted some text
    if (startOffset === endOffset) console.log('nothing highlighted');
    else console.log('selected text: ', window.getSelection().toString());
  }
})();
