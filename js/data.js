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
