var opacityValue = 0.7;

// sub total value
var obracunTotal = 0;
var obracunOstali = 0;

var storageObjObracun = [];
var storageObjOstali = [];

(function() {
  // on load
  var globalObjHTML;
  var globalSpanClass;
  // document

  // PREVIEW-MODE BEGIN
  document.querySelector('#preview-mode').addEventListener('click', function(e) {
    e.preventDefault();

    if (
      isNumberOnly('#redni-broj') &&
      isValideMonthYear('.is-medium', 1) &&
      isBasicValidation('#redni-broj-fullname') &&
      isBasicValidation('#redni-broj-naziv-radnog') &&
      isBasicValidationOne('#redni-broj-zvanje') &&
      isBasicValidation('#redni-broj-grad-drzava') &&
      isBasicValidation('#redni-broj-gdje') &&
      document.querySelectorAll('.loopme')[0]
    ) {
      // first section
      localStorage.setItem('first-section', JSON.stringify(retrieveFirstSection()));
      // second section
      if (document.querySelectorAll('.data-preview-obracun').length > 0) {
        retrievePreviewSection('data-preview-obracun', extraFillObracun, storageObjObracun);
      }
      // third section
      if (document.querySelectorAll('.data-preview-ostali').length > 0) {
        retrievePreviewSection('data-preview-ostali', extraFillOstali, storageObjOstali);
      }

      localStorage.setItem('obracun-table', JSON.stringify(storageObjObracun));
      localStorage.setItem('ostali-table', JSON.stringify(storageObjOstali));
      localStorage.setItem(
        'kredit-value',
        document.querySelector('#predujam-value').value
          ? parseFloat(document.querySelector('#predujam-value').value).toFixed(2)
          : ''
      );
      window.location.href = './print.html';
    } else {
      window.scrollTo(0, 0);
      if (!isNumberOnly('#redni-broj')) {
        document.querySelector('#redni-broj').style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#redni-broj-fullname')) {
        document.querySelector('#redni-broj-fullname').style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidationOne('#redni-broj-zvanje')) {
        document.querySelector('#redni-broj-zvanje').style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#redni-broj-naziv-radnog')) {
        document.querySelector('#redni-broj-naziv-radnog').style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#redni-broj-grad-drzava')) {
        document.querySelector('#redni-broj-grad-drzava').style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#redni-broj-gdje')) {
        document.querySelector('#redni-broj-gdje').style.border = '2px solid #ff88a0';
      }
      if (!isValideMonthYear('.is-medium', 1)) {
        document.querySelectorAll('.is-medium')[1].style.border = '2px solid #ff88a0';
      } else {
        alert('Fill at least one main section (Obracun dnevnica or Ostali troskovi)');
      }
    }
    // PREVIEW-MODE END
  });

  document.querySelector('#obracun-edit-close').style.display = 'none';
  document.querySelector('#ostali-edit-close').style.display = 'none';

  document.querySelector('#redni-broj-fullname').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-zvanje').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-naziv-radnog').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-grad-drzava').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-gdje').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-dodatan-opis').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-pocetno-stanje').addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelector('#redni-broj-zavrsno-stanje').addEventListener('input', function(e) {
    this.style.border = '';
  });
  // FIRST WORD PAGE END
  // redni broj
  document.getElementsByClassName('is-medium')[0].addEventListener('input', function(e) {
    this.style.border = '';
  });

  // datum
  document.getElementsByClassName('is-medium')[1].addEventListener('input', function(e) {
    this.style.border = '';
  });

  // friend-change
  document.querySelector('#friend-stay').addEventListener('change', function(e) {
    document.querySelector('#friend-span').value = this.checked ? 'friend stay' : '';
  });

  // date1 change
  document.querySelectorAll('.date1')[0].addEventListener('input', function(e) {
    this.style.border = '';
  });
  // date2 change
  document.querySelectorAll('.date2')[0].addEventListener('input', function(e) {
    this.style.border = '';
  });

  // date-only change obracun
  document.querySelectorAll('.date-only')[0].addEventListener('input', function(e) {
    this.style.border = '';
  });
  // date-only change ostali
  document.querySelectorAll('.date-only')[1].addEventListener('input', function(e) {
    this.style.border = '';
  });
  document.querySelectorAll('.digit-only')[0].addEventListener('input', function(e) {
    this.style.border = '';
  });
  // country validation
  document.querySelector('#country-name').addEventListener('input', function(e) {
    this.style.border = '';
  });
  // trosak validation
  document.querySelector('#trosak-name').addEventListener('input', function(e) {
    this.style.border = '';
  });
  // currency rate value
  document.querySelector('#currency-rate-value').addEventListener('click', function(e) {
    this.style.border = '';
  });

  // OBRACUN CLOSE
  document.querySelector('#obracun-edit-close').addEventListener('click', function() {
    clearSectionInput('.flag-obracun');
    // reset backgroundColor
    for (var i = 0; i < document.querySelectorAll('.data-preview-obracun').length; i++) {
      document.querySelectorAll('.data-preview-obracun')[i].style.backgroundColor =
        'rgb(243, 243, 243)';
    }
    // reset disable button
    for (var i = 0; i < document.querySelectorAll('.preview-edit').length; i++) {
      document.querySelectorAll('.preview-edit')[i].style.pointerEvents = 'auto';
    }
    document.querySelector('#obracun-save').style.display = '';
    document.querySelector('#obracun-edit').style.display = 'none';
    document.querySelector('#obracun-edit-close').style.display = 'none';
    // disable other two
    alternatePointerEventsOpacity('#obracun-ostalih-troskova', '', 1);

    for (var i = 0; i < document.querySelectorAll('.preview-edit-obracun').length; i++) {
      document.querySelectorAll('.preview-edit-obracun')[i].style.pointerEvents = 'auto';
    }
  });

  // OSTALI CLOSE
  document.querySelector('#ostali-edit-close').addEventListener('click', function() {
    clearSectionInput('.flag-ostali');
    // reset backgroundColor
    for (var i = 0; i < document.querySelectorAll('.data-preview-ostali').length; i++) {
      document.querySelectorAll('.data-preview-ostali')[i].style.backgroundColor =
        'rgb(243, 243, 243)';
    }
    // reset disable button
    for (var i = 0; i < document.querySelectorAll('.preview-edit-ostali').length; i++) {
      document.querySelectorAll('.preview-edit-ostali')[i].style.pointerEvents = 'auto';
    }
    document.querySelector('#ostali-save').style.display = '';
    document.querySelector('#ostali-edit').style.display = 'none';
    document.querySelector('#ostali-edit-close').style.display = 'none';
    // disable other two

    for (var i = 0; i < document.querySelectorAll('.preview-edit-ostali').length; i++) {
      document.querySelectorAll('.preview-edit-ostali')[i].style.pointerEvents = 'auto';
    }
  });

  // SAVE OBRACUN
  document.querySelector('#obracun-save').addEventListener('click', function() {
    if (
      validateDate('.date1', '.date2') &&
      !validateDateOnly('.date-only', 0) &&
      !isEndDateSmaller('.date1', '.date2', 0) &&
      isBasicValidation('#country-name')
    ) {
      createPreviewContainerFirstRow(
        'edit-obracun',
        'delete-obracun',
        'number-obracun',
        document.querySelectorAll('.dp-obracun')
          ? document.querySelectorAll('.dp-obracun').length + 1
          : 1,
        '#data-preview-obracun',
        'modify-operation-obracun',
        'preview-edit-obracun',
        'preview-delete-obracun',
        'data-preview-obracun',
        'dp-obracun',
        addPreviewListenerObracun
      );
      createPreviewContainerSecondRow('.flag-obracun', '.dp-obracun', true);
      clearSectionInput('.flag-obracun');
      for (var i = 0; i < document.querySelectorAll('.preview-edit-obracun').length; i++) {
        document.querySelectorAll('.preview-edit-obracun')[i].style.pointerEvents = 'auto';
      }
      // here you have to place total accumulation VALUE DONT FORGET THAT !!!!
      // modifyTotalValueSub('.loopme', '#total-obracun');
      // reset html here
      document.querySelector('#friend-stay').checked = false;
      resetRedInputBorder('.date-only', '.date1', 0);
      document.querySelector('#country-name').style.border = '';
    } else {
      // put red borders
      if (validateDateOnly('.date-only', 0)) {
        document.querySelectorAll('.date-only')[0].style.border = '2px solid #ff88a0';
      }
      if (validateBeginDate('.date1', 0)) {
        document.querySelectorAll('.date1')[0].style.border = '2px solid #ff88a0';
      }
      if (validateEndDate('.date2', 0)) {
        document.querySelectorAll('.date2')[0].style.border = '2px solid #ff88a0';
      } else {
        document.querySelectorAll('.date1')[0].style.border = '2px solid #ff88a0';
        document.querySelectorAll('.date2')[0].style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#country-name')) {
        document.querySelector('#country-name').style.border = '2px solid #ff88a0';
      }
    }
  });

  // SAVE OSTALI
  document.querySelector('#ostali-save').addEventListener('click', function() {
    if (
      !validateDateOnly('.date-only', 1) &&
      isNumberOnly('.digit-only') &&
      isBasicValidation('#trosak-name') &&
      isCurrencySelected() &&
      isCurrencyRate()
    ) {
      createPreviewContainerFirstRow(
        'edit-ostali',
        'delete-ostali',
        'number-ostali',
        document.querySelectorAll('.dp-ostali')
          ? document.querySelectorAll('.dp-ostali').length + 1
          : 1,
        '#data-preview-ostali',
        'modify-operation-ostali',
        'preview-edit-ostali',
        'preview-delete-ostali',
        'data-preview-ostali',
        'dp-ostali',
        addPreviewListenerOstali
      );
      createPreviewContainerSecondRow('.flag-ostali', '.dp-ostali', false);
      clearSectionInput('.flag-ostali');
      for (var i = 0; i < document.querySelectorAll('.preview-edit-ostali').length; i++) {
        document.querySelectorAll('.preview-edit-ostali')[i].style.pointerEvents = 'auto';
      }
      //reseting after clicking save
      resetRedInputBorderOstali('.digit-only', '.date-only');
      document.querySelector('#currency-text-sub').innerHTML = 'Currency';
    } else {
      if (validateDateOnly('.date-only', 1)) {
        document.querySelectorAll('.date-only')[1].style.border = '2px solid #ff88a0';
      }
      if (!isNumberOnly('.digit-only')) {
        document.querySelectorAll('.digit-only')[0].style.border = '2px solid #ff88a0';
      }
      if (!isBasicValidation('#trosak-name')) {
        document.querySelector('#trosak-name').style.border = '2px solid #ff88a0';
      }
      if (!isCurrencySelected()) {
        document.querySelector('#currency-drop').style.border = '2px solid #ff88a0';
      }
      if (!isCurrencyRate()) {
        document.querySelector('#currency-rate-value').style.border = '2px solid #ff88a0';
      }
    }
  });

  // CURRENCY DROPDOWN EVENTS
  document.querySelector('#currency-drop').addEventListener('click', function(e) {
    if (this.className.indexOf('is-active') > -1) {
      this.classList.remove('is-active');
    } else {
      this.classList.add('is-active');
    }
    this.style.border = '';

    setTimeout(() => {
      window.addEventListener('click', boundInfiniteScroll);
    }, 1);
  });

  for (var i = 0; i < document.querySelectorAll('.dropdown-item').length; i++) {
    document.querySelectorAll('.dropdown-item')[i].addEventListener('click', function(e) {
      if (e.target.innerHTML.indexOf('HRK') > -1) {
        document.querySelector('#currency-rate').style.display = 'none';
      } else {
        document.querySelector('#currency-rate').style.display = '';
      }
      document.querySelector('#currency-text').value = e.target.innerHTML;
      document.querySelector('#currency-text-sub').innerHTML = e.target.innerHTML;
    });
  }

  // MAIN FUNCTION CALL END
})();

// MAIN FUNCTION DECLARATION BEGIN

function createPreviewContainerFirstRow(
  edit,
  del,
  number,
  order,
  holder,
  modify_operation,
  preview_edit,
  preview_delete,
  data_preview,
  dp_obracun,
  callbackPreviewListener
) {
  var container = document.createElement('div');
  container.setAttribute('class', modify_operation);
  var spanContainerEdit = document.createElement('span');
  spanContainerEdit.classList.add(preview_edit, edit + order.toString());
  spanContainerEdit.innerHTML = 'edit';
  var spanContainerDelete = document.createElement('span');
  spanContainerDelete.classList.add(preview_delete, del + order.toString());
  spanContainerDelete.innerHTML = 'delete';
  var spanContainerNumber = document.createElement('span');
  spanContainerNumber.className = 'flt-rgt flt-clr-rgt input-number numberize-prijevozni ' + number;
  spanContainerNumber.innerHTML = '#' + order;

  container.appendChild(spanContainerEdit);
  container.appendChild(spanContainerDelete);
  container.appendChild(spanContainerNumber);

  var mainContainer = document.createElement('div');
  mainContainer.appendChild(container);
  mainContainer.classList.add(data_preview, dp_obracun);
  document.querySelector(holder).appendChild(mainContainer);

  callbackPreviewListener('.' + edit + order.toString(), editFunc, 'edit');
  callbackPreviewListener('.' + del + order.toString(), delFunc, 'delete');
}

function createPreviewContainerSecondRow(selectors, holder, enableFriendStay) {
  var elements = document.querySelectorAll(selectors);
  for (var i = 0; i < elements.length; i++) {
    var spanContainer = document.createElement('span');
    spanContainer.classList.add('loopme');
    spanContainer.textContent = elements[i].value.trim() + ' ';
    document
      .querySelectorAll(holder)
      [document.querySelectorAll(holder).length - 1].appendChild(spanContainer);
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
      globalObjHTML.childNodes[i].innerHTML = array[i] + ' ';
    }
  }
  // parametrizirati
  clearSectionInput('.flag-obracun');
}

function addPreviewListenerObracun(className, fn, tag) {
  document.querySelector(className).addEventListener('click', function(e) {
    if (tag === 'edit') {
      fn(
        e,
        '.preview-edit-obracun',
        '.dp-obracun',
        '.flag-obracun',
        '#obracun-edit-close',
        '#obracun-save',
        '#obracun-edit',
        'obracun-edit',
        '#plus-minus-dnevnica-holder-obracun'
      );
      alternatePointerEventsOpacity('#obracun-ostalih-troskova', 'none', opacityValue);
    }
    if (tag === 'delete') {
      fn(
        e,
        '.number-obracun',
        '.flag-obracun',
        '#obracun-save',
        '#obracun-edit',
        '#obracun-edit-close'
      );
      alternatePointerEventsOpacity('#obracun-ostalih-troskova', '', 1);

      for (var i = 0; i < document.querySelectorAll('.preview-edit-obracun').length; i++) {
        document.querySelectorAll('.preview-edit-obracun')[i].style.pointerEvents = 'auto';
      }
    }
  });
}

function addPreviewListenerOstali(className, fn, tag) {
  document.querySelector(className).addEventListener('click', function(e) {
    if (tag === 'edit') {
      fn(
        e,
        '.preview-edit-ostali',
        '.dp-ostali',
        '.flag-ostali',
        '#ostali-edit-close',
        '#ostali-save',
        '#ostali-edit',
        'ostali-edit',
        '#plus-minus-ostali-holder'
      );
      alternatePointerEventsOpacity('#obracun-dnevnica', 'none', opacityValue);
    }
    if (tag === 'delete') {
      fn(e, '.number-ostali', '.flag-ostali', '#ostali-save', '#ostali-edit', '#ostali-edit-close');
      alternatePointerEventsOpacity('#obracun-dnevnica', '', 1);
      for (var i = 0; i < document.querySelectorAll('.preview-edit-ostali').length; i++) {
        document.querySelectorAll('.preview-edit-ostali')[i].style.pointerEvents = 'auto';
      }
    }
  });
}

function editFunc(
  e,
  preview_edit_dot,
  dp_obracun_dot,
  flag_obracun_dot,
  obracun_edit_closeID,
  obracun_saveID,
  obracun_editID,
  obracun_edit,
  plus_minus_holderID
) {
  // reset css disable button
  for (var i = 0; i < document.querySelectorAll(preview_edit_dot).length; i++) {
    document.querySelectorAll(preview_edit_dot)[i].style.pointerEvents = 'auto';
  }
  var getSpanContent = [];
  var objHTML = e.path[2];
  // disable edit button
  e.target.style.pointerEvents = 'none';
  editModeActivate(
    objHTML,
    dp_obracun_dot,
    flag_obracun_dot,
    obracun_edit_closeID,
    obracun_saveID,
    obracun_editID,
    obracun_edit,
    plus_minus_holderID
  );
  for (var i = 0; i < objHTML.childNodes.length; i++) {
    if (objHTML.childNodes[i].tagName === 'SPAN' && objHTML.childNodes[i].value !== '') {
      getSpanContent.push(objHTML.childNodes[i].innerHTML);
    }
  }
  populateSpanSection(flag_obracun_dot, getSpanContent);
}

function delFunc(
  e,
  number_obracun_dot,
  flag_obracun_dot,
  obracun_saveID,
  obracun_editID,
  obracun_edit_closeID
) {
  // replace with IE and Safari working version
  e.path[2].parentNode.removeChild(e.path[2]);
  resetNumberOrder(number_obracun_dot);
  clearSectionInput(flag_obracun_dot);
  document.querySelector(obracun_saveID).style.display = '';
  document.querySelector(obracun_editID).style.display = 'none';
  document.querySelector(obracun_edit_closeID).style.display = 'none';
}

function editModeActivate(
  objHTML,
  spanClass,
  flag_obracun_dot,
  obracun_edit_closeID,
  obracun_saveID,
  obracun_editID,
  obracun_edit,
  plus_minus_holderID
) {
  // clear all colors and show close button
  document.querySelector(obracun_edit_closeID).style.display = '';
  for (var i = 0; i < document.querySelectorAll(spanClass).length; i++) {
    document.querySelectorAll(spanClass)[i].style.backgroundColor = '#f3f3f3';
  }
  objHTML.style.backgroundColor = '#ff3860d4';
  // <div id="obracun-save" class="back-button save-button">save</div>
  // remove save
  document.querySelector(obracun_saveID).style.display = 'none';

  // append edit button
  if (document.querySelector(obracun_editID) === null) {
    var divObracunEdit = document.createElement('div');
    divObracunEdit.setAttribute('id', obracun_edit);
    divObracunEdit.className = 'back-button save-button';
    divObracunEdit.style.backgroundColor = '#ffdd57';
    divObracunEdit.style.color = '#4a4a4a';
    divObracunEdit.innerHTML = 'edit';
    // append edit close button for edit
    document.querySelector(plus_minus_holderID).appendChild(divObracunEdit);
  }
  // show edit button again
  if (document.querySelector(obracun_editID).style.display === 'none') {
    document.querySelector(obracun_editID).style.display = '';
  }
  globalObjHTML = objHTML;
  // flag-obracun
  globalSpanClass = flag_obracun_dot;
  // handling events
  document
    .querySelector(obracun_editID)
    .removeEventListener('click', updatePreviewContainerSecondRow, true);
  document
    .querySelector(obracun_editID)
    .addEventListener('click', updatePreviewContainerSecondRow, true);
}

function populateSpanSection(selector, array) {
  for (var i = 0; i < document.querySelectorAll(selector).length; i++) {
    document.querySelectorAll(selector)[i].value = array[i].trim();
  }
}

function clearSectionInput(selector) {
  for (var i = 0; i < document.querySelectorAll(selector).length; i++) {
    document.querySelectorAll(selector)[i].value = '';
  }
}
function resetNumberOrder(selector) {
  for (var i = 0; i < document.querySelectorAll(selector).length; i++) {
    document.querySelectorAll(selector)[i].innerHTML = '#' + (i + 1);
  }
}

function modifyTotalValueSub(selector, friendStay) {
  if (document.querySelector(friendStay)) {
    return document.querySelector(friendStay).checked ? 70 : 50;
  }
  alert('ERROR OCCURED FILL FORM AGAIN!');
}
// date validation
function validateDate(selector1, selector2) {
  var begin = document
    .querySelector(selector1)
    .value.trimStart()
    .trimEnd();
  var end = document
    .querySelector(selector2)
    .value.trimStart()
    .trimEnd();

  if (
    begin.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/) !== null &&
    end.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/) !== null
  ) {
    return true;
  }
  return false;
}

function validateBeginDate(selector, index) {
  return document
    .querySelectorAll(selector)
    [index].value.trimStart()
    .trimEnd()
    .match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/) !== null
    ? false
    : true;
}

function validateEndDate(selector, index) {
  return document
    .querySelectorAll(selector)
    [index].value.trimStart()
    .trimEnd()
    .match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/) !== null
    ? false
    : true;
}

function validateDateOnly(selector, index) {
  return document
    .querySelectorAll(selector)
    [index].value.trimStart()
    .trimEnd()
    .match(/^(\d{2})\.(\d{2})\.(\d{4})$/) !== null
    ? false
    : true;
}

function isValideMonthYear(selector, index) {
  var temp =
    document
      .querySelectorAll(selector)
      [index].value.trimStart()
      .trimEnd()
      .match(/^(\d{2})\.(\d{4})$/) !== null
      ? true
      : false;

  if (
    temp &&
    parseInt(
      document
        .querySelectorAll(selector)
        [index].value.trimStart()
        .trimEnd()
        .substring(0, 2),
      10
    ) <= 12 &&
    parseInt(
      document
        .querySelectorAll(selector)
        [index].value.trimStart()
        .trimEnd()
        .substring(0, 2),
      10
    ) > 0
  ) {
    return true;
  }

  return false;
}

function isEndDateSmaller(selector1, selector2, index) {
  var begin = document
    .querySelectorAll(selector1)
    [index].value.trimStart()
    .trimEnd();
  var end = document
    .querySelectorAll(selector2)
    [index].value.trimStart()
    .trimEnd();
  return dateTimeToDays(begin, end) < 0;
}

function isNumberOnly(selector) {
  var value = document
    .querySelector(selector)
    .value.trimStart()
    .trimEnd();
  return value.length > 0 && value % 1 >= 0;
}

function isBasicValidation(selector) {
  return document.querySelector(selector).value.length > 3;
}
function isBasicValidationOne(selector) {
  return document.querySelector(selector).value.length > 1;
}

function isCurrencySelected() {
  return document.querySelector('#currency-text-sub').innerHTML.trim() !== 'Currency';
}

function isCurrencyRate() {
  if (document.querySelector('#currency-rate-value')) {
    return document.querySelector('#currency-rate-value').value.trim().length > 1;
  }
  return true;
}

function dateTimeToDays(begin, end) {
  var dateSubstractionMiliSeconds =
    new Date(
      end.substring(6, 10),
      parseInt(end.substring(3, 5)) - 1,
      end.substring(0, 2),
      end.substring(11, 13),
      end.substring(14, end.length)
    ).getTime() -
    new Date(
      begin.substring(6, 10),
      parseInt(begin.substring(3, 5)) - 1,
      begin.substring(0, 2),
      begin.substring(11, 13),
      begin.substring(14, end.length)
    ).getTime();

  var hours = dateSubstractionMiliSeconds / (1000 * 60 * 60);
  return hours / 24;
}

function resetRedInputBorder(date0, date1, index) {
  document.querySelectorAll(date0)[index].style.border = '';
  document.querySelectorAll(date1)[index].style.border = '';
}

function resetRedInputBorderOstali(digitOnly, dateOnly) {
  document.querySelectorAll(digitOnly)[0].style.border = '';
  document.querySelectorAll(dateOnly)[1].style.border = '';
}

function alternatePointerEventsOpacity(dnevnicaID, pointerValue, opacityValue) {
  document.querySelector(dnevnicaID).style.pointerEvents = pointerValue;
  document.querySelector(dnevnicaID).style.opacity = opacityValue;
}
// MAIN FUNCTION DECLARATION END
// data-preview-ostali
// 'data-preview-obracun'

function retrieveFirstSection() {
  var array = [];
  for (var i = 0; i < document.getElementsByClassName('is-medium').length; i++) {
    array.push(document.getElementsByClassName('is-medium')[i].value.trim());
  }
  return array;
}

function retrievePreviewSection(dataPreviewSeletor, callback, callbackParam) {
  callbackParam.push([]);
  getOutCountry = '';
  getOutFriendStay = '';

  for (var i = 0; i < document.getElementsByClassName(dataPreviewSeletor).length; i++) {
    var parent = document.getElementsByClassName(dataPreviewSeletor)[i];
    var tempArray = [];
    for (var j = 0; j < parent.childNodes.length; j++) {
      if (parent.childNodes[j].tagName === 'SPAN' && parent.childNodes[j].innerHTML.trim() !== '') {
        if (dataPreviewSeletor === 'data-preview-obracun') {
          getOutCountry = parent.childNodes[3].innerHTML.trim();
          getOutFriendStay = parent.childNodes[parent.childNodes.length - 1].innerHTML.trim();
        }
        tempArray.push(parent.childNodes[j].innerHTML.trim());
      }
    }
    callbackParam.push(tempArray);
    callback(callbackParam, getOutCountry, getOutFriendStay);
  }
}

function extraFillObracun(array, countryInput, getFriend) {
  var tempArr = array[array.length - 1];
  var getLast = tempArr[tempArr.length - 1];

  var days = dateTimeToDays(tempArr[2], tempArr[3]);
  var sati = days * 24;
  var jedinicneDnevnice = moneyAmountFromCountry(countryInput); // needs to be integer
  jedinicneDnevnice = applyFriendStay(jedinicneDnevnice, getFriend);

  if (array.length !== 0) {
    var remainder = sati % 24;
    if (remainder >= 8 && remainder <= 12) {
      // pola
      days = Math.ceil(days) - 0.5;
    } else if (remainder > 12 && remainder < 24) {
      // cjeli broj
      days = Math.ceil(days);
    }
    var iznos = jedinicneDnevnice * days;
    tempArr.splice(
      4,
      4,
      sati.toFixed(1),
      days.toFixed(2),
      jedinicneDnevnice.toFixed(2),
      iznos.toFixed(2)
    );
  }
}

function extraFillOstali(array) {
  // add iznos element
  tempArr = array[array.length - 1];
  tempArr[2] = parseFloat(tempArr[2].replace(',', '.')).toFixed(2);
  if (tempArr[3].trim().indexOf('HRK') < 0) {
    tempArr.push((parseFloat(tempArr[2].trim()) * parseFloat(tempArr[4].trim())).toFixed(2));
  } else {
    // if it contains HRK
    tempArr.push('_');
    tempArr.push(parseFloat(tempArr[2].trim()).toFixed(2));
  }
}

function moneyAmountFromCountry(value) {
  value = capitalizeFirstLetter(value);
  console.log('went to moneyFromCountry' + value);
  if (value === 'Hrvatska' || value === 'Croatia') {
    return 170;
  } else if (value === 'Njemacka' || value === 'Njemačka' || value === 'Germany') {
    return 350;
  } else if (value === 'Spanjolska' || value === 'Španjolska' || value === 'Spain') {
    return 350;
  }
  return 350;
}

function applyFriendStay(integerValue, friendStayEnable) {
  // check if applyFriendStay is enabled
  console.log('went to apply friend stay' + friendStayEnable);
  console.log(friendStayEnable.indexOf('friend') === -1);
  if (friendStayEnable.indexOf('friend') === -1) {
    console.log('integer value is: ' + integerValue);
    return integerValue;
  }
  // friend stay money given
  if (integerValue === 350) {
    return 500;
  } else if (integerValue === 170) {
    // ovo treba provjerit
    return 250;
  }
  return 500;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function boundInfiniteScroll() {
  if (document.querySelector('#currency-drop').className.indexOf('is-active') > -1) {
    document.querySelector('#currency-drop').classList.remove('is-active');
  }

  window.removeEventListener('click', this.boundInfiniteScroll);
  return;
}
