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

  // open sheet in preview mode
  document.querySelector('#preview-mode').addEventListener('click', function() {
    getAllInputSection('.flag-obracun');
    getAllInputSection('.flag-prijevozni');
    getAllInputSection('.flag-ostali');

    // document.querySelector('#parent-heading').style.display = 'none';
    // document.querySelector('#parent-container').style.display = 'none';
    // document.body.classList.remove('body2');
    // document.querySelector('#main-print-container').style.display = '';

    // window.print();

    // document.querySelector('.back-button').addEventListener('click', function() {
    //   document.querySelector('#parent-heading').style.display = '';
    //   document.querySelector('#parent-container').style.display = '';
    //   document.querySelector('#main-print-container').style.display = 'none';
    // });
  });

  //SETTINGS BEGIN

  //default font size
  document.querySelector('#row-default').addEventListener('click', function() {
    fontSize = 0;
    changeFontSizeSpan(fontSizeObject.array1, fontSizeObject.fontSize1, fontSize);
    changeFontSizeSpan(fontSizeObject.array2, fontSizeObject.fontSize2, fontSize);
    changeFontSizeSpan(fontSizeObject.array3, fontSizeObject.fontSize3, fontSize);
    changeFontSizeSpan(fontSizeGeneral.array, fontSizeGeneral.fontSize, fontSize);
  });

  // font change
  document.querySelector('#fonts').addEventListener('click', function() {
    fontFlag = !fontFlag;
    for (var i = 0; i < document.querySelectorAll('span').length; i++) {
      fontFlag
        ? document.querySelectorAll('span')[i].classList.add('new-font')
        : document.querySelectorAll('span')[i].classList.remove('new-font');
    }
    fontFlag
      ? (this.querySelectorAll('span')[0].innerHTML = 'font2')
      : (this.querySelectorAll('span')[0].innerHTML = 'font1');
  });

  //plus icon zoom
  document.querySelector('#zoom-plus').addEventListener('click', function() {
    fontSize = fontSize + 1;
    if (fontSize < 11) {
      changeFontSizeSpan(fontSizeObject.array1, fontSizeObject.fontSize1, fontSize);
      changeFontSizeSpan(fontSizeObject.array2, fontSizeObject.fontSize2, fontSize);
      changeFontSizeSpan(fontSizeObject.array3, fontSizeObject.fontSize3, fontSize);
      changeFontSizeSpan(fontSizeGeneral.array, fontSizeGeneral.fontSize, fontSize);
    } else {
      alert('Maximum size reached');
    }
  });

  // minus icon zoom
  document.querySelector('#zoom-minus').addEventListener('click', function() {
    fontSize = fontSize - 1;
    if (fontSize > -5) {
      changeFontSizeSpan(fontSizeObject.array1, fontSizeObject.fontSize1, fontSize);
      changeFontSizeSpan(fontSizeObject.array2, fontSizeObject.fontSize2, fontSize);
      changeFontSizeSpan(fontSizeObject.array3, fontSizeObject.fontSize3, fontSize);
      changeFontSizeSpan(fontSizeGeneral.array, fontSizeGeneral.fontSize, fontSize);
    } else {
      alert('Minimum size reached');
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
        ? document
            .querySelectorAll('.left-corner-text-main')
            [i].classList.add('left-corner-text-main2')
        : document
            .querySelectorAll('.left-corner-text-main')
            [i].classList.remove('left-corner-text-main2');
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

  // MAIN FUNCTIONS BEGIN

  // SAVE OBRACUN
  document.querySelector('#obracun-save').addEventListener('click', function() {
    createPreviewContainerFirstRow(
      'edit-obracun',
      'delete-obracun',
      'number-obracun',
      1,
      '#data-preview-obracun'
    );
    createPreviewContainerSecondRow('.flag-obracun', '#data-preview-obracun');
  });

  // SAVE PRIJEVOZNI
  document.querySelector('#prijevozni-save').addEventListener('click', function() {
    createPreviewContainerFirstRow();
    createPreviewContainerSecondRow();
  });

  // SAVE OSTALI
  document.querySelector('#ostali-save').addEventListener('click', function() {
    createPreviewContainerFirstRow();
    createPreviewContainerSecondRow();
  });

  // MAIN FUNCIONS END
})();
// MAIN FUNCTIONS BEGIN
function getAllInputSection(selectors) {
  for (var i = 0; i < document.querySelectorAll(selectors).length; i++) {
    console.log(document.querySelectorAll(selectors)[i].value);
  }
}
function createPreviewContainerFirstRow(edit, del, number, order, holder) {
  var container = document.createElement('div');
  container.setAttribute('class', 'modify-operation');

  var spanContainerEdit = document.createElement('span');
  spanContainerEdit.classList.add('preview-edit', edit);
  spanContainerEdit.innerHTML = 'edit';
  var spanContainerDelete = document.createElement('span');
  spanContainerDelete.classList.add('preview-delete', del);
  spanContainerDelete.innerHTML = 'delete';
  var spanContainerNumber = document.createElement('span');
  spanContainerNumber.className = 'flt-rgt flt-clr-rgt input-number numberize-prijevozni ' + number;
  spanContainerNumber.innerHTML = '#' + 1;

  container.appendChild(spanContainerEdit);
  container.appendChild(spanContainerDelete);
  container.appendChild(spanContainerNumber);

  var mainContainer = document.createElement('div');
  mainContainer.appendChild(container);
  mainContainer.classList.add('data-preview', 'dp-obracun');
  document.querySelector(holder).appendChild(mainContainer);
  //   <div class="modify-operation">
  //   <span class="preview-edit">edit</span>
  //   <span class="preview-delete">delete</span>
  //   <span class="flt-rgt flt-clr-rgt input-number numberize-prijevozni">#1</span>
  // </div>
  // <span>value1</span>
  // <span>value2</span>
  // <span>value3</span>
  // <span>value4</span>
}

function createPreviewContainerSecondRow(selectors, holder) {
  var elements = document.querySelectorAll(selectors);
  for (var i = 0; i < elements.length; i++) {
    var spanContainer = document.createElement('span');
    spanContainer.textContent = elements[i].value;
    document
      .querySelectorAll('.dp-obracun')
      [document.querySelectorAll('.dp-obracun').length - 1].appendChild(spanContainer);
  }
}

// MAIN FUNCTIONS END

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

  return {
    array1: array1,
    fontSize1: 18,
    array2: array2,
    fontSize2: 20,
    array3: array3,
    fontSize3: 20
  };
}
function filtrateAllApart() {
  var array = document.querySelectorAll('span');
  var array_0 = [];
  for (var i = 0; i < array.length; i++) {
    if (
      array[i].className.indexOf('left-corner-text-main') < 0 &&
      array[i].className.indexOf('total-value') < 0 &&
      array[i].className.indexOf('ft-sz-20') < 0
    )
      array_0.push(array[i]);
  }

  return { array: array_0, fontSize: 16 };
}
function changeFontSizeSpan(array, font, fontChange) {
  for (var i = 0; i < array.length; i++) {
    array[i].style.fontSize = (font + fontChange).toString() + 'px';
  }
}
