var $codeJournal = document.querySelector('#code-journal');
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

function entryDomTree(entry) {
  var $li = document.createElement('li');
  $li.className = 'row';

  var $imageDiv = document.createElement('div');
  $imageDiv.className = 'column-half';

  var $image = document.createElement('img');
  $image.className = 'placeholder-image';
  $image.setAttribute('src', data.entries[0].photoUrl);
  $image.setAttribute('alt', data.entries[0].title);

  $imageDiv.appendChild($image);
  $li.appendChild($imageDiv);

  var $textDiv = document.createElement('div');
  $textDiv.className = 'column-half journal-entry';

  var $entryHeading = document.createElement('h2');
  $entryHeading.className = 'journal-entry-title';
  $entryHeading.textContent = data.entries[0].title;

  var $entryText = document.createElement('p');
  $entryText.textContent = data.entries[0].textArea;

  $textDiv.appendChild($entryHeading);
  $textDiv.appendChild($entryText);
  $li.appendChild($textDiv);

  return $li;

}

entryDomTree(data);
