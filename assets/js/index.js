(function() {
  // variable to reference modal
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');

  //event listener called when mouseup event fires
  document.addEventListener('mouseup', function() {
    if (!modalContainer.classList.contains('show')) {
      getSelectedText();
    }
  });

  function getSelectedText() {
    const { startOffset, endOffset } = window.getSelection().getRangeAt(0);
    //if true means user has highlighted some text
    if (startOffset === endOffset) {
      console.log('nothing highlighted');
    } else {
      modal.textContent = window.getSelection().toString();
      modalContainer.classList.add('show');
    }
  }

  document.addEventListener('mousedown', event => {
    if (modalContainer.classList.contains('show')) {
      const {
        srcElement: { classList }
      } = event;
      if (classList.contains('modal')) {
        console.log('in modal');
      } else {
        console.log('outside modal');
        modalContainer.classList.remove('show');
      }
    } else {
      console.log('no modal on page');
    }
  });
})();
