var $codeJournal = document.querySelector('#code-journal');
var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");
var dataModel = data;

$photoUrlInput.addEventListener('input', photoUpload);

function photoUpload(event) {
  if (event.target.value && event.target.checkValidity()) {
    $placeHolderImage.setAttribute('src', $photoUrlInput.value);
  } else {
    $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

function saveEntries(event) {
  event.preventDefault();
  var formInputValues = {
    title: $codeJournal.elements.title.value,
    photoUrl: $codeJournal.elements.photoUrl.value,
    textArea: $codeJournal.elements.notes.value,
    entryNumber: dataModel.nextEntryId
  };
  dataModel.nextEntryId++;

  dataModel.entries.push(formInputValues);

  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $codeJournal.elements.title.value = '';
  $codeJournal.elements.photoUrl.value = '';
  $codeJournal.elements.notes.value = '';

}

$codeJournal.addEventListener('submit', saveEntries);

var previousData = localStorage.getItem('code-journal-storage');
if (previousData !== 'null') {
  dataModel = JSON.parse(previousData);
}

window.addEventListener('beforeunload', storeToLocalStorage);

function storeToLocalStorage(event) {
  var dataJSON = JSON.stringify(dataModel);
  localStorage.setItem('code-journal-storage', dataJSON);
}
