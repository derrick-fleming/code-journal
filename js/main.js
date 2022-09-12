var $placeHolderImage = document.querySelector('.placeholder-image');
var $photoUrlInput = document.querySelector("input[name='photoUrl']");

$photoUrlInput.addEventListener('input', photoUpload);

function photoUpload(event) {
  if (event.target.value) {
    $placeHolderImage.setAttribute('src', event.target.value);
  } else {
    $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
