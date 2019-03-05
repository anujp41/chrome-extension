(function() {
  // variable to reference modal
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  let highlightedText = '';

  //function to check if text was selected and if yes, get the selected text
  function getSelectedText() {
    const { startOffset, endOffset } = window.getSelection().getRangeAt(0);
    //if true means user has highlighted some text
    if (startOffset !== endOffset) {
      const modalText = modal.querySelector('.modal-text');
      highlightedText = window.getSelection().toString();
      modalText.textContent = highlightedText;
      modalContainer.classList.add('show');
    }
  }

  //function to handle save to google doc
  function saveToGoogle(event) {
    //gets list of children of clicked item as the children have
    //to contain img and figcaption
    const {
      target: { children }
    } = event;
    console.log('children ', children);
    //checks if img exists
    //if true, means a google doc was clicked
    //if false, means was clicked inside modal but not on a google doc
    if (children[0].localName === 'img') {
      const googleDocName = children[1].textContent;
      console.log(`
      Text to Save: ${highlightedText};
      Google Document Name: ${googleDocName};
      URL: ${window.location.href}
      `);
    }
  }

  //event listener called when mouseup event fires
  document.addEventListener('mouseup', getSelectedText);

  //event listener to remove modal when user click outside
  document.addEventListener('mousedown', event => {
    const { path: eventPath } = event;
    const checkIfInModal = eventPath
      .slice(0, -2)
      .some(child => child.classList.contains('modal'));
    if (!checkIfInModal) {
      modalContainer.classList.remove('show');
    }
  });

  //listener for click on selected google doc
  modal.addEventListener('click', saveToGoogle);
})();
