(function() {
  // on load
  var nigth_mode_toggle = false;
  var highlight_mode_toggle = false;
  var hide_show_btn = false;
  var fontFlag = false;
  var script;
  var link;
  var tempMain;
  var tempPrint;
  var justOnce = false;

  var fontSizeObject = getSeparateSpan();
  var fontSizeGeneral = filtrateAllApart();
  var fontSize = 0;

  appendLinkTag();
  appendScriptTag();
  // better solution callback;
  setTimeout(function() {
    hidePrintPage();
  }, 500);

  hideMinusIcon('#remove-extra-obracun');
  hideMinusIcon('#remove-extra-prijevozni');
  hideMinusIcon('#remove-extra-ostali');

  // open sheet in preview mode
  document.querySelector('#preview-mode').addEventListener('click', function() {
    getAllInputSection('.flag-obracun');
    getAllInputSection('.flag-prijevozni');
    getAllInputSection('.flag-ostali');

    document.querySelector('#parent-heading').style.display = 'none';
    document.querySelector('#parent-container').style.display = 'none';
    document.body.classList.remove('body2');
    document.querySelector('#main-print-container').style.display = '';

    window.print();

    document.querySelector('.back-button').addEventListener('click', function() {
      document.querySelector('#parent-heading').style.display = '';
      document.querySelector('#parent-container').style.display = '';
      document.querySelector('#main-print-container').style.display = 'none';
    });
  });

  //SETTINGS BEGIN

  //default font size
  document.querySelector('#row-default').addEventListener('click', function() {
    // total value hand highlight heading have different fonts, adjust that
    for (var i = 0; i < fontSizeObject.length; i++) {
      fontSizeObject[i].style.fontSize = '16px';
    }
  });

  // font change
  document.querySelector('#fonts').addEventListener('click', function() {
    fontFlag = !fontFlag;
    for (var i = 0; i < document.querySelectorAll('span').length; i++) {
      fontFlag ? document.querySelectorAll('span')[i].classList.add('new-font') : document.querySelectorAll('span')[i].classList.remove('new-font');
    }
    fontFlag ? (this.querySelectorAll('span')[0].innerHTML = 'font2') : (this.querySelectorAll('span')[0].innerHTML = 'font1');
  });

  //plus icon zoom
  document.querySelector('#zoom-plus').addEventListener('click', function() {
    fontSize = fontSize + 1;

    for (var i = 0; i < fontSizeObject.array1.length; i++) {
      fontSizeObject.array1[i].style.fontSize = (fontSizeObject.fontSize1 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeObject.array2.length; i++) {
      fontSizeObject.array2[i].style.fontSize = (fontSizeObject.fontSize2 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeObject.array3.length; i++) {
      fontSizeObject.array3[i].style.fontSize = (fontSizeObject.fontSize3 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeGeneral.array.length; i++) {
      fontSizeGeneral.array[i].style.fontSize = (fontSizeGeneral.fontSize + fontSize).toString() + 'px';
    }
  });

  // minus icon zoom
  document.querySelector('#zoom-minus').addEventListener('click', function() {
    fontSize = fontSize - 1;

    for (var i = 0; i < fontSizeObject.array1.length; i++) {
      fontSizeObject.array1[i].style.fontSize = (fontSizeObject.fontSize1 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeObject.array2.length; i++) {
      fontSizeObject.array2[i].style.fontSize = (fontSizeObject.fontSize2 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeObject.array3.length; i++) {
      fontSizeObject.array3[i].style.fontSize = (fontSizeObject.fontSize3 + fontSize).toString() + 'px';
    }
    for (var i = 0; i < fontSizeGeneral.array.length; i++) {
      fontSizeGeneral.array[i].style.fontSize = (fontSizeGeneral.fontSize + fontSize).toString() + 'px';
    }
  });

  document.querySelector('#zoom-minus').addEventListener('click', function() {});
  document.querySelector('#hide-show-btn').addEventListener('click', function() {
    hide_show_btn = !hide_show_btn
      ? (document.querySelector('#settings-section').style.display = 'none')
      : (document.querySelector('#settings-section').style.display = null);

    hide_show_btn ? (this.innerHTML = 'show') : (this.innerHTML = 'hide');
  });

  //highlight
  document.querySelector('#highlight-heading').addEventListener('click', function() {
    highlight_mode_toggle = !highlight_mode_toggle;
    highlight_mode_toggle ? (this.innerHTML = 'unhlt') : (this.innerHTML = 'hlt');
    for (var i = 0; i < document.querySelectorAll('.left-corner-text-main').length; i++) {
      highlight_mode_toggle
        ? document.querySelectorAll('.left-corner-text-main')[i].classList.add('left-corner-text-main2')
        : document.querySelectorAll('.left-corner-text-main')[i].classList.remove('left-corner-text-main2');
    }
  });

  //night-mode
  document.querySelector('#night-mode').addEventListener('click', function() {
    nigth_mode_toggle = !nigth_mode_toggle;
    if (nigth_mode_toggle) {
      document.querySelector('body').classList.add('body2');
      document.querySelector('.logo').classList.add('night-logo');
      document.querySelector('#night-mode').innerHTML = 'day';
      document.querySelector('#main-heading').style.color = 'white';
    } else {
      document.querySelector('body').classList.remove('body2');
      document.querySelector('.logo').classList.remove('night-logo');
      document.querySelector('#night-mode').innerHTML = 'night';
      document.querySelector('#main-heading').style.color = '#363636';
    }
    for (var i = 0; i < document.querySelectorAll('.font-element').length; i++) {
      nigth_mode_toggle
        ? document.querySelectorAll('.font-element')[i].classList.add('font-element2')
        : document.querySelectorAll('.font-element')[i].classList.remove('font-element2');
    }
    for (var i = 0; i < document.querySelectorAll('.left-corner-text').length; i++) {
      nigth_mode_toggle
        ? document.querySelectorAll('.left-corner-text')[i].classList.add('left-corner-text2')
        : document.querySelectorAll('.left-corner-text')[i].classList.remove('left-corner-text2');
    }

    for (var i = 0; i < document.querySelectorAll('.input-number').length; i++) {
      nigth_mode_toggle
        ? document.querySelectorAll('.input-number')[i].classList.add('input-number2')
        : document.querySelectorAll('.input-number')[i].classList.remove('input-number2');
    }
    for (var i = 0; i < document.querySelectorAll('.total-value').length; i++) {
      nigth_mode_toggle
        ? document.querySelectorAll('.total-value')[i].classList.add('total-value2')
        : document.querySelectorAll('.total-value')[i].classList.remove('total-value2');
    }
    for (var i = 0; i < document.querySelectorAll('.left-corner').length; i++) {
      nigth_mode_toggle
        ? document.querySelectorAll('.left-corner')[i].classList.add('left-corner2')
        : document.querySelectorAll('.left-corner')[i].classList.remove('left-corner2');
    }
  });
  //SETTINGS END

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
function appendScriptTag() {
  script = document.createElement('script');
  script.src = './js/print.js';
  script.async = false;
  document.body.appendChild(script);
}

function appendLinkTag() {
  var head = document.getElementsByTagName('head')[0];
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './css/print.css';
  head.appendChild(link);
}
function hidePrintPage() {
  document.querySelector('#main-print-container').style.display = 'none';
}
function getAllHeading(classValue) {
  var array = Array.prototype.slice.call(document.querySelectorAll('span'));

  var arry = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].className.indexOf(classValue) > -1) {
      arr.push(array[i]);
    }
  }

  return arr;
}
function getSeparateSpan() {
  var array = document.querySelectorAll('span');
  var array1 = [];
  var array2 = [];
  var array3 = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i].className.indexOf('left-corner-text-main') > -1) array1.push(array[i]);
    else if (array[i].className.indexOf('total-value') > -1) array2.push(array[i]);
    else if (array[i].className.indexOf('ft-sz-20') > -1) array3.push(array[i]);
  }

  return { array1: array1, fontSize1: 18, array2: array2, fontSize2: 20, array3: array3, fontSize3: 20 };
}
function filtrateAllApart() {
  var array = document.querySelectorAll('span');
  var array_0 = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].className.indexOf('left-corner-text-main') < 0 && array[i].className.indexOf('total-value') < 0 && array[i].className.indexOf('ft-sz-20') < 0)
      array_0.push(array[i]);
  }
  console.log(array_0);
  return { array: array_0, fontSize: 16 };
}
function changeFontSizeSpan() {}
