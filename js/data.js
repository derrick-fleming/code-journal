/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('code-journal-storage');
if (previousData !== 'null') {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', storeToLocalStorage);

function storeToLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-storage', dataJSON);
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
  $entryHeading.className = 'journal-entry-title';
  $entryHeading.textContent = entry.title;

  var $entryText = document.createElement('p');
  $entryText.textContent = entry.textArea;

  $textDiv.appendChild($entryHeading);
  $textDiv.appendChild($entryText);
  $li.appendChild($textDiv);

  return $li;

}

var $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', appendJournal);

function appendJournal(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryDomTree(data.entries[i]));
  }
}
