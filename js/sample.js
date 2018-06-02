(function() {
  // on load
  hideMinusIcon('#remove-extra-obracun');

  // open sheet in preview mode
  document.querySelector('#preview-mode').addEventListener('click', function() {
    getAllInputObracun();
  });

  // plus button
  document.querySelector('#add-extra-obracun').addEventListener('click', function() {
    addExtraBox('.add-obracun', '#obracun-dnevnica', '.numberize-dnevnica');
  });

  // minus button
  document.querySelector('#remove-extra-obracun').addEventListener('click', function() {
    removeExtraBox('#obracun-dnevnica', '.add-obracun');
  });
})();

function getAllInputObracun() {
  for (var i = 0; i < document.querySelectorAll('.flag-obracun').length; i++) {
    console.log(document.querySelectorAll('.flag-obracun')[i].value);
  }
}

function addExtraBox(create, appender, orderNumber) {
  if (document.querySelectorAll(create).length <= 9) {
    var node = document.createElement('div');
    node.setAttribute('class', create.substring(1));
    node.innerHTML = document.querySelector(create).innerHTML;

    document.querySelector(appender).appendChild(node);
    document.querySelectorAll(orderNumber)[document.querySelectorAll(orderNumber).length - 1].textContent =
      '#' + document.querySelectorAll(orderNumber).length.toString();
    addMinusIcon('#remove-extra-obracun');
  } else {
    alert("you've reached the maximum amount of orders");
  }
}

function removeExtraBox(appender, childNode) {
  if (document.querySelectorAll(childNode).length > 1) {
    document.querySelector(appender).removeChild(document.querySelectorAll(childNode)[document.querySelectorAll(childNode).length - 1]);
    if (document.querySelectorAll(childNode).length === 1) {
      hideMinusIcon('#remove-extra-obracun');
    }
  }
}

function addMinusIcon(self) {
  document.querySelector(self).style.visibility = 'visible';
}

function hideMinusIcon(self) {
  document.querySelector(self).style.visibility = 'hidden';
}
