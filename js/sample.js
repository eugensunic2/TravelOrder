(function() {
  // on load
  hideMinusIcon('#remove-extra-obracun');
  hideMinusIcon('#remove-extra-prijevozni');
  hideMinusIcon('#remove-extra-ostali');

  // open sheet in preview mode
  document.querySelector('#preview-mode').addEventListener('click', function() {
    getAllInputSection('.flag-obracun');
    getAllInputSection('.flag-prijevozni');
    getAllInputSection('.flag-ostali');

    html2canvas(document.querySelector('#capture')).then(canvas => {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF();
      pdf.text('somet text', 10, 10);
      //pdf.addImage('../image/country/croatia.png', 'JPEG', 0, 0);
      pdf.lines([[2, 2], [-2, 2], [1, 1, 2, 2, 3, 3], [2, 1]], 212, 110, 10); // line, line, bezier curve, line
      pdf.rect(100, 100, 100, 100, '');
      pdf.addPage();
      //  pdf.imageLoadFromUrl('../image/country/croatia.png');
      // place this mage at given X, Y coordinates on the page
      //pdf.imagePlace(20, 40);
      console.log(pdf.x);
      pdf.addImage('', 'JPEG', 15, 40, 180, 160);
      pdf.save('download.pdf');
    });
  });

  // plus button obracun (1)
  document.querySelector('#add-extra-obracun').addEventListener('click', function() {
    addExtraBox('.add-obracun', '#obracun-dnevnica', '.numberize-dnevnica', '#remove-extra-obracun');
  });

  // minus button obracun (1)
  document.querySelector('#remove-extra-obracun').addEventListener('click', function() {
    removeExtraBox('#obracun-dnevnica', '.add-obracun', '#remove-extra-obracun');
  });

  // plus button prijevozni (2)
  document.querySelector('#add-extra-prijevozni').addEventListener('click', function() {
    addExtraBox('.add-prijevozni', '#obracun-prijevoznih-troskova', '.numberize-prijevozni', '#remove-extra-prijevozni');
  });

  // minus button prijevozni (2)
  document.querySelector('#remove-extra-prijevozni').addEventListener('click', function() {
    removeExtraBox('#obracun-prijevoznih-troskova', '.add-prijevozni', '#remove-extra-prijevozni');
  });

  // plus button ostali (3)
  document.querySelector('#add-extra-ostali').addEventListener('click', function() {
    addExtraBox('.add-ostali', '#obracun-ostalih-troskova', '.numberize-ostali', '#remove-extra-ostali');
  });

  // minus button ostali (3)
  document.querySelector('#remove-extra-ostali').addEventListener('click', function() {
    removeExtraBox('#obracun-ostalih-troskova', '.add-ostali', '#remove-extra-ostali');
  });
})();

function getAllInputSection(selectors) {
  for (var i = 0; i < document.querySelectorAll(selectors).length; i++) {
    console.log(document.querySelectorAll(selectors)[i].value);
  }
}

function addExtraBox(create, appender, orderNumber, showIcon) {
  if (document.querySelectorAll(create).length <= 9) {
    var node = document.createElement('div');
    node.setAttribute('class', create.substring(1));
    node.innerHTML = document.querySelector(create).innerHTML;

    document.querySelector(appender).appendChild(node);
    document.querySelectorAll(orderNumber)[document.querySelectorAll(orderNumber).length - 1].textContent =
      '#' + document.querySelectorAll(orderNumber).length.toString();
    addMinusIcon(showIcon);
  } else {
    alert("you've reached the maximum amount of orders");
  }
}

function removeExtraBox(appender, childNode, hideIcon) {
  if (document.querySelectorAll(childNode).length > 1) {
    document.querySelector(appender).removeChild(document.querySelectorAll(childNode)[document.querySelectorAll(childNode).length - 1]);
    if (document.querySelectorAll(childNode).length === 1) {
      hideMinusIcon(hideIcon);
    }
  }
}

function addMinusIcon(self) {
  document.querySelector(self).style.visibility = 'visible';
}

function hideMinusIcon(self) {
  document.querySelector(self).style.visibility = 'hidden';
}
