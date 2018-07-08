(function() {
  // on load
  var globalObjHTML;
  var globalSpanClass;

  document.querySelector('#obracun-edit-close').style.display = 'none';
  document.querySelector('#prijevozni-edit-close').style.display = 'none';
  document.querySelector('#ostali-edit-close').style.display = 'none';
  // MAIN FUNCTION CALL BEGIN

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

  // SAVE OBRACUN
  document.querySelector('#obracun-save').addEventListener('click', function() {
    createPreviewContainerFirstRow(
      'edit-obracun',
      'delete-obracun',
      'number-obracun',
      document.querySelectorAll('.dp-obracun')
        ? document.querySelectorAll('.dp-obracun').length + 1
        : 1,
      '#data-preview-obracun'
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
      '#data-preview-prijevozni'
    );
    createPreviewContainerSecondRow('.flag-prijevozni', '.dp-prijevozni');
    clearSectionInput('.flag-prijevozni');
  });

  // SAVE OSTALI
  document.querySelector('#ostali-save').addEventListener('click', function() {
    createPreviewContainerFirstRow();
    createPreviewContainerSecondRow();
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
  clearSectionInput('.flag-obracun');
}

function addPreviewListener(className, fn) {
  document.querySelector(className).addEventListener('click', function(e) {
    fn(e);
  });
}

function editFunc(e) {
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

function delFunc(e) {
  // replace with IE and Safari working version
  e.path[2].remove();
  resetNumberOrder('.number-obracun');
  clearSectionInput('.flag-obracun');
}

function editModeActivate(objHTML, spanClass) {
  // clear all colors and show close button
  document.querySelector('#obracun-edit-close').style.display = '';
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
    document.querySelector('#obracun-edit').style.display = '';
  }
  globalObjHTML = objHTML;
  globalSpanClass = '.flag-obracun';
  // handling events
  document
    .querySelector('#obracun-edit')
    .removeEventListener('click', updatePreviewContainerSecondRow, true);
  document
    .querySelector('#obracun-edit')
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
