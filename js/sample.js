(function() {
  // on load
  var globalObjHTML;
  var globalSpanClass;

  document.querySelector('#obracun-edit-close').style.display = 'none';
  document.querySelector('#prijevozni-edit-close').style.display = 'none';
  document.querySelector('#ostali-edit-close').style.display = 'none';
  // MAIN FUNCTION CALL BEGIN

  // OBRACUN CLOSE
  document.querySelector('#obracun-edit-close').addEventListener('click', function() {
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

  // PRIJEVOZNI CLOSE
  document.querySelector('#prijevozni-edit-close').addEventListener('click', function() {
    clearSectionInput('.flag-prijevozni');
    // reset backgroundColor
    for (var i = 0; i < document.querySelectorAll('.data-preview-prijevozni').length; i++) {
      document.querySelectorAll('.data-preview-prijevozni')[i].style.backgroundColor =
        'rgb(243, 243, 243)';
    }
    // reset disable button
    for (var i = 0; i < document.querySelectorAll('.preview-edit-prijevozni').length; i++) {
      document.querySelectorAll('.preview-edit-prijevozni')[i].style.pointerEvents = 'auto';
    }
    document.querySelector('#prijevozni-save').style.display = '';
    document.querySelector('#prijevozni-edit').style.display = 'none';
    document.querySelector('#prijevozni-edit-close').style.display = 'none';
  });

  // PRIJEVOZNI CLOSE
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
  });

  // SAVE OBRACUN
  document.querySelector('#obracun-save').addEventListener('click', function() {
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
    createPreviewContainerSecondRow('.flag-obracun', '.dp-obracun');
    clearSectionInput('.flag-obracun');
  });

  // SAVE PRIJEVOZNI
  document.querySelector('#prijevozni-save').addEventListener('click', function() {
    createPreviewContainerFirstRow(
      'edit-prijevozni',
      'delete-prijevozni',
      'number-prijevozni',
      document.querySelectorAll('.dp-prijevozni')
        ? document.querySelectorAll('.dp-prijevozni').length + 1
        : 1,
      '#data-preview-prijevozni',
      'modify-operation-prijevozni',
      'preview-edit-prijevozni',
      'preview-delete-prijevozni',
      'data-preview-prijevozni',
      'dp-prijevozni',
      addPreviewListenerPrijevozni
    );
    createPreviewContainerSecondRow('.flag-prijevozni', '.dp-prijevozni');
    clearSectionInput('.flag-prijevozni');
  });

  // SAVE OSTALI
  document.querySelector('#ostali-save').addEventListener('click', function() {
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
    createPreviewContainerSecondRow('.flag-ostali', '.dp-ostali');
    clearSectionInput('.flag-ostali');
  });

  // MAIN FUNCTION CALL END
})();

// MAIN FUNCTION DECLARATION BEGIN
function getAllInputSection(selectors) {
  for (var i = 0; i < document.querySelectorAll(selectors).length; i++) {
    console.log(document.querySelectorAll(selectors)[i].value);
  }
}

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

function createPreviewContainerSecondRow(selectors, holder) {
  var elements = document.querySelectorAll(selectors);
  for (var i = 0; i < elements.length; i++) {
    var spanContainer = document.createElement('span');
    spanContainer.textContent = elements[i].value + ' ';
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
  clearSectionInput('.flag-prijevozni');
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
    }
  });
}
function addPreviewListenerPrijevozni(className, fn, tag) {
  document.querySelector(className).addEventListener('click', function(e) {
    if (tag === 'edit') {
      fn(
        e,
        '.preview-edit-prijevozni',
        '.dp-prijevozni',
        '.flag-prijevozni',
        '#prijevozni-edit-close',
        '#prijevozni-save',
        '#prijevozni-edit',
        'prijevozni-edit',
        '#plus-minus-prijevozni-holder'
      );
    }
    if (tag === 'delete') {
      fn(
        e,
        '.number-prijevozni',
        '.flag-prijevozni',
        '#prijevozni-save',
        '#prijevozni-edit',
        '#prijevozni-edit-close'
      );
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
    }
    if (tag === 'delete') {
      fn(e, '.number-ostali', '.flag-ostali', '#ostali-save', '#ostali-edit', '#ostali-edit-close');
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
  e.path[2].remove();
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
    document.querySelectorAll(selector)[i].value = array[i];
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

// MAIN FUNCTION DECLARATION END
