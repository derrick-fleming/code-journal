var $codeJournal = document.querySelector('#code-journal');
var $entries = document.querySelector('#entries');
var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");
var $noEntries = document.querySelector('#no-entries');
var $searchForm = document.querySelector('#search-bar-form');
var $clearFormLink = document.querySelector('.clear.hidden');
var $entriesLink = document.querySelector('.nav-link');
var $newEntry = document.querySelector('.button.entry');
var $ul = document.querySelector('ul');

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
    textArea: $codeJournal.elements.notes.value
  };

  if (data.editing === null) {
    formInputValues.entryNumber = data.nextEntryId;
  } else {
    formInputValues.entryNumber = data.editing.entryNumber;
  }

  if (data.editing !== null) {
    for (var index = 0; index < data.entries.length; index++) {
      if (data.editing.entryNumber === data.entries[index].entryNumber) {
        data.entries[index] = formInputValues;
      }
    }
  } else {
    data.entries.unshift(formInputValues);
  }

  data.nextEntryId++;

  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $codeJournal.reset();

  $codeJournal.className = 'row hidden';
  $entries.className = '';

  $noEntries.className = 'column-full hidden';
  data.view = 'entries';

  if (data.editing === null) {
    $ul.prepend(entryDomTree(data.entries[0]));
    return;
  }

  var $liReplace = document.querySelectorAll('li');
  for (var indexLi = 0; indexLi < $liReplace.length; indexLi++) {
    if (Number($liReplace[indexLi].dataset.entryId) === data.editing.entryNumber) {
      for (var y = 0; y < data.entries.length; y++) {
        if (data.entries[y].entryNumber === (Number($liReplace[indexLi].dataset.entryId))) {
          $liReplace[indexLi].replaceWith(entryDomTree(data.entries[y]));
          break;
        }
      }
    }
  }

  data.editing = null;
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

document.addEventListener('DOMContentLoaded', appendJournal);

function appendJournal(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryDomTree(data.entries[i]));
  }
}

$entriesLink.addEventListener('click', allEntriesView);
$newEntry.addEventListener('click', newEntryView);

if (data.view === 'entries') {
  $codeJournal.className = 'row hidden';
  $entries.className = '';
} else {
  $codeJournal.className = 'row';
  $entries.className = 'hidden';
}

function allEntriesView(event) {
  $codeJournal.className = 'row hidden';
  data.view = 'entries';
  $entries.className = '';
  $searchForm.reset();
  var $li = document.querySelectorAll('li');
  for (var index = 0; index < $li.length; index++) {
    $li[index].className = 'row';
  }
  $noSearch.className = 'column-full hidden';

}

var $delete = document.querySelector('.delete.hidden');

function newEntryView(event) {
  $codeJournal.className = 'row';
  $entries.className = 'hidden';
  data.view = 'entry-form';

  $codeJournal.reset();
  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');

  $delete.className = 'delete hidden';

}

$ul.addEventListener('click', editEntries);

function editEntries(event) {
  if (event.target.tagName === 'A') {
    $codeJournal.className = 'row';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }

  var dataEntry = event.target.closest('li');
  var closestId = dataEntry.dataset.entryId;

  for (var i = 0; i < data.entries.length; i++) {
    if (Number(closestId) === data.entries[i].entryNumber) {
      data.editing = data.entries[i];
      break;
    }
  }

  $codeJournal.elements.title.value = data.editing.title;
  $codeJournal.elements.photoUrl.value = data.editing.photoUrl;
  $placeHolderImage.setAttribute('src', data.editing.photoUrl);
  $codeJournal.elements.notes.value = data.editing.textArea;
  $delete.className = 'delete';
}

var $deleteEntry = document.querySelector('.delete');
var $overlay = document.querySelector('.overlay.hidden');
var $modalContainer = document.querySelector('.modal-container.hidden');

$deleteEntry.addEventListener('click', deleteModulePopUp);
function deleteModulePopUp(event) {
  $overlay.className = 'overlay';
  $modalContainer.className = 'modal-container';
}

var $cancelButton = document.querySelector('.button.cancel');

$cancelButton.addEventListener('click', hideModal);
function hideModal(event) {
  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';
}

var $confirmButton = document.querySelector('.button.confirm');
$confirmButton.addEventListener('click', deleteEntry);
function deleteEntry(event) {
  var $liDelete = document.querySelectorAll('li');
  for (var indexLi = 0; indexLi < $liDelete.length; indexLi++) {
    if (Number($liDelete[indexLi].dataset.entryId) === data.editing.entryNumber) {
      $liDelete[indexLi].remove();
      break;
    }
  }
  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    if (data.entries[dataIndex].entryNumber === data.editing.entryNumber) {
      data.entries.splice(dataIndex, 1);
    }
  }

  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';
  $codeJournal.className = 'row hidden';
  $entries.className = '';
  data.view = 'entries';

  if (data.entries.length === 0) {
    $noEntries.className = 'column-full';
  }
  data.editing = null;
}

var $searchFormContainer = document.querySelector('.form-container');
var $searchBar = document.querySelector('.search-row');

$searchBar.addEventListener('focus', function (event) {
  $searchFormContainer.className = 'form-container search-focus';
});

$searchBar.addEventListener('blur', function (event) {
  $searchFormContainer.className = 'form-container';
});

$searchForm.addEventListener('submit', filterSearchResults);

function filterSearchResults(event) {
  event.preventDefault();
  var filterData = $searchForm.elements.search.value;
  filterData = filterData.toLowerCase();
  filterData = filterData.split(' ');

  searchQuery(filterData);
  hiddenList();
}

$searchForm.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    filterSearchResults(event);
  }
});

var $noSearch = document.querySelector('#no-search');
$searchForm.addEventListener('input', function (event) {
  if ($searchForm.elements.search.value === '') {
    $clearFormLink.className = 'clear hidden';
  } else {
    $clearFormLink.className = 'clear';
  }

  var liveKey = event.target.value.toLowerCase();
  liveKey = liveKey.split(' ');

  searchQuery(liveKey);
  hiddenList();
});

function hiddenList() {
  var $liHidden = document.querySelectorAll('li');
  var $hiddenList = document.querySelectorAll('li.row.hidden');
  if ($hiddenList.length === $liHidden.length) {
    $noSearch.className = 'column-full';
  } else {
    $noSearch.className = 'column-full hidden';
  }

  if ($liHidden.length === 0) {
    $noSearch.className = 'column-full hidden';
  }
}

$clearFormLink.addEventListener('click', function (event) {
  $clearFormLink.className = 'clear hidden';
  var $li = document.querySelectorAll('li');
  for (var index = 0; index < $li.length; index++) {
    $li[index].className = 'row';
  }
  $searchForm.reset();
  hiddenList();
});

function searchQuery(characters) {

  var $liSearch = document.querySelectorAll('li');
  for (var indexLi = 0; indexLi < $liSearch.length; indexLi++) {
    $liSearch[indexLi].className = 'row';
  }

  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    var title = data.entries[dataIndex].title.toLowerCase();
    var textEntry = data.entries[dataIndex].textArea.toLowerCase();
    for (var keyIndex = 0; keyIndex < characters.length; keyIndex++) {
      if (!title.includes(characters[keyIndex]) && !textEntry.includes(characters[keyIndex])) {
        for (var i = 0; i < $liSearch.length; i++) {
          if (Number($liSearch[i].dataset.entryId) === data.entries[dataIndex].entryNumber) {
            $liSearch[i].className = 'row hidden';
          }
        }
      }
    }
  }
}
