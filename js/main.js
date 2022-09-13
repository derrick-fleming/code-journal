var $codeJournal = document.querySelector('#code-journal');
var $entries = document.querySelector('#entries');
var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");

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
    entryNumber: data.nextEntryId
  };
  data.entries.unshift(formInputValues);
  data.nextEntryId++;

  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $codeJournal.reset();
}

$codeJournal.addEventListener('submit', saveEntries);

var $entriesLink = document.querySelector('.nav-link');
var $newEntry = document.querySelector('.button.entry');

$entriesLink.addEventListener('click', allEntriesView);

function allEntriesView(event) {
  $codeJournal.className = 'row hidden';
  $entries.className = '';
}

$newEntry.addEventListener('click', newEntryView);

function newEntryView(event) {
  $codeJournal.className = 'row';
  $entries.className = 'hidden';
}
