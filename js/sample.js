(function () {
  // on load
  var globalObjHTML;
  var globalSpanClass;

  document.querySelector('#obracun-edit-close').style.display = 'none'
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
  setTimeout(function () {
    hidePrintPage();
  }, 500);

  // open sheet in preview mode
  document.querySelector('#preview-mode').addEventListener('click', function () {
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
  document.querySelector('#row-default').addEventListener('click', function () {
    fontSize = 0;
    changeFontSizeSpan(fontSizeObject.array1, fontSizeObject.fontSize1, fontSize);
    changeFontSizeSpan(fontSizeObject.array2, fontSizeObject.fontSize2, fontSize);
    changeFontSizeSpan(fontSizeObject.array3, fontSizeObject.fontSize3, fontSize);
    changeFontSizeSpan(fontSizeGeneral.array, fontSizeGeneral.fontSize, fontSize);
  });

  // font change
  document.querySelector('#fonts').addEventListener('click', function () {
    fontFlag = !fontFlag;
    for (var i = 0; i < document.querySelectorAll('span').length; i++) {
      fontFlag
        ?
        document.querySelectorAll('span')[i].classList.add('new-font') :
        document.querySelectorAll('span')[i].classList.remove('new-font');
    }
    fontFlag
      ?
      (this.querySelectorAll('span')[0].innerHTML = 'font2') :
      (this.querySelectorAll('span')[0].innerHTML = 'font1');
  });

  //plus icon zoom
  document.querySelector('#zoom-plus').addEventListener('click', function () {
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
  document.querySelector('#zoom-minus').addEventListener('click', function () {
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

  document.querySelector('#zoom-minus').addEventListener('click', function () {});
  document.querySelector('#hide-show-btn').addEventListener('click', function () {
    hide_show_btn = !hide_show_btn ?
      (document.querySelector('#settings-section').style.display = 'none') :
      (document.querySelector('#settings-section').style.display = null);

    hide_show_btn ? (this.innerHTML = 'show') : (this.innerHTML = 'hide');
  });

  //highlight
  document.querySelector('#highlight-heading').addEventListener('click', function () {
    highlight_mode_toggle = !highlight_mode_toggle;
    highlight_mode_toggle ? (this.innerHTML = 'unhlt') : (this.innerHTML = 'hlt');
    for (var i = 0; i < document.querySelectorAll('.left-corner-text-main').length; i++) {
      highlight_mode_toggle
        ?
        document
        .querySelectorAll('.left-corner-text-main')[i].classList.add('left-corner-text-main2') :
        document
        .querySelectorAll('.left-corner-text-main')[i].classList.remove('left-corner-text-main2');
    }
  });

  //night-mode
  document.querySelector('#night-mode').addEventListener('click', function () {
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
        ?
        document.querySelectorAll('.font-element')[i].classList.add('font-element2') :
        document.querySelectorAll('.font-element')[i].classList.remove('font-element2');
    }
    for (var i = 0; i < document.querySelectorAll('.left-corner-text').length; i++) {
      nigth_mode_toggle
        ?
        document.querySelectorAll('.left-corner-text')[i].classList.add('left-corner-text2') :
        document.querySelectorAll('.left-corner-text')[i].classList.remove('left-corner-text2');
    }

    for (var i = 0; i < document.querySelectorAll('.input-number').length; i++) {
      nigth_mode_toggle
        ?
        document.querySelectorAll('.input-number')[i].classList.add('input-number2') :
        document.querySelectorAll('.input-number')[i].classList.remove('input-number2');
    }
    for (var i = 0; i < document.querySelectorAll('.total-value').length; i++) {
      nigth_mode_toggle
        ?
        document.querySelectorAll('.total-value')[i].classList.add('total-value2') :
        document.querySelectorAll('.total-value')[i].classList.remove('total-value2');
    }
    for (var i = 0; i < document.querySelectorAll('.left-corner').length; i++) {
      nigth_mode_toggle
        ?
        document.querySelectorAll('.left-corner')[i].classList.add('left-corner2') :
        document.querySelectorAll('.left-corner')[i].classList.remove('left-corner2');
    }
  });
  //SETTINGS END

  // MAIN FUNCTIONS BEGIN
  document.querySelector('#obracun-edit-close').addEventListener('click', function () {
    clearSectionInput('.flag-obracun');

    // reset backgroundColor
    for (var i = 0; i < document.querySelectorAll('.data-preview').length; i++) {
      document.querySelectorAll('.data-preview')[i].style.backgroundColor = 'rgb(243, 243, 243)';

    }
    // reset disable button
    for (var i = 0; i < document.querySelectorAll('.preview-edit').length; i++) {
      document.querySelectorAll('.preview-edit')[i].style.pointerEvents = 'auto';

    }
    document.querySelector('#obracun-save').style.display = '';
    document.querySelector('#obracun-edit').style.display = 'none';
    document.querySelector('#obracun-edit-close').style.display = 'none';
  });
  // SAVE OBRACUN
  document.querySelector('#obracun-save').addEventListener('click', function () {
    createPreviewContainerFirstRow(
      'edit-obracun',
      'delete-obracun',
      'number-obracun',
      document.querySelectorAll('.dp-obracun') ?
      document.querySelectorAll('.dp-obracun').length + 1 :
      1,
      '#data-preview-obracun'
    );
    createPreviewContainerSecondRow('.flag-obracun', '.dp-obracun');
    clearSectionInput('.flag-obracun');
  });

  // SAVE PRIJEVOZNI
  document.querySelector('#prijevozni-save').addEventListener('click', function () {
    createPreviewContainerFirstRow();
    createPreviewContainerSecondRow();
    clearSectionInput('.flag-prijevozni');
  });

  // SAVE OSTALI
  document.querySelector('#ostali-save').addEventListener('click', function () {
    createPreviewContainerFirstRow();
    createPreviewContainerSecondRow();
    clearSectionInput('.flag-ostali');
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
  spanContainerEdit.classList.add('preview-edit', edit + order.toString());
  spanContainerEdit.innerHTML = 'edit';
  var spanContainerDelete = document.createElement('span');
  spanContainerDelete.classList.add('preview-delete', del + order.toString());
  spanContainerDelete.innerHTML = 'delete';
  var spanContainerNumber = document.createElement('span');
  spanContainerNumber.className = 'flt-rgt flt-clr-rgt input-number numberize-prijevozni ' + number;
  spanContainerNumber.innerHTML = '#' + order;

  container.appendChild(spanContainerEdit);
  container.appendChild(spanContainerDelete);
  container.appendChild(spanContainerNumber);

  var mainContainer = document.createElement('div');
  mainContainer.appendChild(container);
  mainContainer.classList.add('data-preview', 'dp-obracun');
  document.querySelector(holder).appendChild(mainContainer);

  addPreviewListener('.' + edit + order.toString(), editFunc);
  addPreviewListener('.' + del + order.toString(), delFunc);
}

function createPreviewContainerSecondRow(selectors, holder) {
  var elements = document.querySelectorAll(selectors);
  for (var i = 0; i < elements.length; i++) {
    var spanContainer = document.createElement('span');
    spanContainer.textContent = elements[i].value;
    document
      .querySelectorAll(holder)[document.querySelectorAll(holder).length - 1].appendChild(spanContainer);
  }
}

function updatePreviewContainerSecondRow() {

  var array = [];
  // have to do this to adjust indexes of both arrays
  for (var i = 0; i < document.querySelectorAll(globalSpanClass).length; i++) {
    array.push(document.querySelectorAll(globalSpanClass)[i].value);
  }
  array.splice(0, 0, '');
  for (var i = 0; i < globalObjHTML.childNodes.length; i++) {
    if (globalObjHTML.childNodes[i].tagName === 'SPAN' && array[i] !== '') {
      globalObjHTML.childNodes[i].innerHTML = array[i];
    }
  }
}

function addPreviewListener(className, fn) {
  document.querySelector(className).addEventListener('click', function (e) {
    fn(e);
  });
}

function editFunc(e, callback) {
  // reset css disable button
  for (var i = 0; i < document.querySelectorAll('.preview-edit').length; i++) {
    document.querySelectorAll('.preview-edit')[i].style.pointerEvents = 'auto';

  }
  var getSpanContent = [];
  var objHTML = e.path[2];
  // disable edit button
  e.target.style.pointerEvents = 'none';
  editModeActivate(objHTML, '.dp-obracun');
  for (var i = 0; i < objHTML.childNodes.length; i++) {
    if (objHTML.childNodes[i].tagName === 'SPAN' && objHTML.childNodes[i].value !== '') {
      getSpanContent.push(objHTML.childNodes[i].innerHTML);
    }
  }
  populateSpanSection('.flag-obracun', getSpanContent);
}

function delFunc() {
  console.log('delete');
}

function editModeActivate(objHTML, spanClass) {
  // clear all colors and show close button 
  document.querySelector('#obracun-edit-close').style.display = ''
  for (var i = 0; i < document.querySelectorAll(spanClass).length; i++) {
    document.querySelectorAll(spanClass)[i].style.backgroundColor = '#f3f3f3';
  }
  objHTML.style.backgroundColor = '#ff3860d4';
  // <div id="obracun-save" class="back-button save-button">save</div>
  // remove save
  document.querySelector('#obracun-save').style.display = 'none';

  // append edit button
  if (document.querySelector('#obracun-edit') === null) {
    var divObracunEdit = document.createElement('div');
    divObracunEdit.setAttribute('id', 'obracun-edit');
    divObracunEdit.className = 'back-button save-button';
    divObracunEdit.style.backgroundColor = '#ffdd57';
    divObracunEdit.style.color = '#4a4a4a';
    divObracunEdit.innerHTML = 'edit';
    // append edit close button for edit
    document.querySelector('#plus-minus-dnevnica-holder').appendChild(divObracunEdit);
  }
  // show edit button again
  if (document.querySelector('#obracun-edit').style.display === 'none') {
    document.querySelector('#obracun-edit').style.display = ''
  }
  globalObjHTML = objHTML;
  globalSpanClass = '.flag-obracun';
  // handling events
  document.querySelector('#obracun-edit').removeEventListener('click', updatePreviewContainerSecondRow, true);
  document.querySelector('#obracun-edit').addEventListener('click', updatePreviewContainerSecondRow, true);

}

function populateSpanSection(selector, array) {
  for (var i = 0; i < document.querySelectorAll(selector).length; i++) {
    document.querySelectorAll(selector)[i].value = array[i];
  }
}

function clearSectionInput(selector) {
  for (var i = 0; i < document.querySelectorAll(selector).length; i++) {
    document.querySelectorAll(selector)[i].value = '';
  }
}

// MAIN FUNCTIONS END

//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------
//--------------------------------------

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

  return {
    array: array_0,
    fontSize: 16
  };
}

function changeFontSizeSpan(array, font, fontChange) {
  for (var i = 0; i < array.length; i++) {
    array[i].style.fontSize = (font + fontChange).toString() + 'px';
  }
}