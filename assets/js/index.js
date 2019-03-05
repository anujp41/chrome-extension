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
      const modalDocSection = modal.querySelector('.icon-list');
      highlightedText = window.getSelection().toString();
      modalText.textContent = highlightedText;
      const randNum = Math.ceil(Math.random() * 10);
      console.log('randNum: ', randNum);
      for (let i = 1; i <= randNum; i++) {
        const googleDiv = document.createElement('div');
        googleDiv.className = 'google-doc';
        const googleImg = document.createElement('img');
        const googleDocName = document.createElement('figcaption');
        googleImg.src = '/assets/icons/doc.png';
        googleDocName.textContent = `Google Document ${i}`;
        googleDiv.appendChild(googleImg);
        googleDiv.appendChild(googleDocName);
        modalDocSection.appendChild(googleDiv);
      }
      modalContainer.classList.add('show');
    }
  }

  //function to check if google doc was clicked
  //check depends on fact that "google-doc" class has two children
  function checkIfGoogleDoc(event) {
    let result = false;
    const { target } = event;
    if (
      target.className === 'google-doc' ||
      target.parentNode.className === 'google-doc'
    )
      result = true;
    return result;
  }

  //function to get name of clicked google doc
  function getDocName(event) {
    const { target } = event;
    const docName =
      target.textContent.trim() || target.parentNode.textContent.trim();
    return docName;
  }

  //function to handle save to google doc
  function saveToGoogle(event) {
    //gets list of children of clicked item as the children have
    //to contain img and figcaption
    const check = checkIfGoogleDoc(event);
    //checks if img exists
    //if true, means a google doc was clicked
    //if false, means was clicked inside modal but not on a google doc
    if (check) {
      const googleDocName = getDocName(event);
      console.log(`Text to Save: ${highlightedText};\nGoogle Document Name: ${googleDocName};\nURL: ${
        window.location.href
      }
      `);
      highlightedText = '';
      modal.querySelector('.icon-list').innerHTML = '';
      modalContainer.classList.remove('show');
    }
  }

  //event listener called when mouseup event fires
  document.addEventListener('mouseup', function(event) {
    const { path: eventPath } = event;
    const checkIfInModal = eventPath
      .slice(0, -2)
      .some(child => child.classList.contains('modal'));
    if (!checkIfInModal) getSelectedText();
  });

  //event listener to remove modal when user click outside
  document.addEventListener('mousedown', event => {
    const { path: eventPath } = event;
    const checkIfInModal = eventPath
      .slice(0, -2)
      .some(child => child.classList.contains('modal'));
    if (!checkIfInModal) {
      highlightedText = '';
      modal.querySelector('.icon-list').innerHTML = '';
      modalContainer.classList.remove('show');
    }
  });

  //listener for click on selected google doc
  modal.addEventListener('click', saveToGoogle);
})();
