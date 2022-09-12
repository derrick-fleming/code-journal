var $codeJournal = document.querySelector('#code-journal');
var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");

$photoUrlInput.addEventListener('input', photoUpload);

function resetImage() {
  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function resetText() {
  $codeJournal.elements.title.value = '';
  $codeJournal.elements.photoUrl.value = '';
  $codeJournal.elements.notes.value = '';

}

function photoUpload(event) {
  if (event.target.value && event.target.checkValidity()) {
    $placeHolderImage.setAttribute('src', $photoUrlInput.value);
  } else {
    resetImage();
  }
}

function saveEntries(event) {
  event.preventDefault();
  var formInputValues = {
    title: $codeJournal.elements.title.value,
    photoUrl: $codeJournal.elements.photoUrl.value,
    textArea: $codeJournal.elements.notes.value,
    entryNumber: data.nextEntryId
  };
  data.nextEntryId++;

  data.entries.push(formInputValues);
  resetImage();
  resetText();
}

$codeJournal.addEventListener('submit', saveEntries);
