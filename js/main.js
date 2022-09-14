var $codeJournal = document.querySelector('#code-journal');
var $entries = document.querySelector('#entries');
var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");
var $noEntries = document.querySelector('#no-entries');

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

  $codeJournal.className = 'row hidden';
  $entries.className = '';

  $noEntries.className = 'column-full hidden';
  data.view = 'entries';
}

$codeJournal.addEventListener('submit', saveEntries);

if (data.entries.length >= 1) {
  $noEntries.className = 'column-full hidden';
}

function entryDomTree(entry) {
  var $li = document.createElement('li');
  $li.className = 'row';

  var $imageDiv = document.createElement('div');
  $imageDiv.className = 'column-half';

  var $image = document.createElement('img');
  $image.className = 'placeholder-image';
  $image.setAttribute('src', entry.photoUrl);
  $image.setAttribute('alt', entry.title);

  $imageDiv.appendChild($image);
  $li.appendChild($imageDiv);

  var $textDiv = document.createElement('div');
  $textDiv.className = 'column-half journal-entry';

  var $entryHeading = document.createElement('h2');
  $entryHeading.className = 'journal-entry-title inline';
  $entryHeading.textContent = entry.title;

  var $editIcon = document.createElement('a');
  $editIcon.className = 'icon fa-sharp fa-solid fa-pen';

  var $entryText = document.createElement('p');
  $entryText.textContent = entry.textArea;

  $textDiv.appendChild($entryHeading);
  $textDiv.appendChild($editIcon);
  $textDiv.appendChild($entryText);
  $li.appendChild($textDiv);

  $li.setAttribute('data-entry-id', entry.entryNumber);

  return $li;

}

var $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', appendJournal);

function appendJournal(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryDomTree(data.entries[i]));
  }
}

function prependJournal(event) {
  $ul.prepend(entryDomTree(data.entries[0]));
}

$codeJournal.addEventListener('submit', prependJournal);

var $entriesLink = document.querySelector('.nav-link');
var $newEntry = document.querySelector('.button.entry');

$entriesLink.addEventListener('click', allEntriesView);
$newEntry.addEventListener('click', newEntryView);

if (data.view === 'entries') {
  $codeJournal.className = 'row hidden';
  data.view = 'entries';
} else {
  $codeJournal.className = 'row';
  $entries.className = 'hidden';
}

function allEntriesView(event) {
  $codeJournal.className = 'row hidden';
  data.view = 'entries';
  $entries.className = '';
}

function newEntryView(event) {
  $codeJournal.className = 'row';
  $entries.className = 'hidden';
  data.view = 'entry-form';
}

$ul.addEventListener('click', editEntries);

function editEntries(event) {
  if (event.target.tagName === 'A') {
    $codeJournal.className = 'row';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }
}
