(function() {
  // on load
  var nigth_mode_toggle = false;
  var highlight_mode_toggle = false;
  var hide_show_btn = false;
  var show_hide_content = false;
  var fontFlag = false;

  var annotateColumn = false;
  var script;
  var link;
  var tempMain;
  var tempPrint;
  var justOnce = false;

  var fontSizeObject = getSeparateSpan();
  var fontSizeGeneral = filtrateAllApart();
  var fontSize = 0;

  //SETTINGS BEGIN
  // annotate mane columns
  document.querySelector('#annotate-columns').addEventListener('click', function() {
    annotateColumn = !annotateColumn;
    if (annotateColumn) {
      document.querySelector('#main-date-section').classList.add('annotate-main-column');
      document.querySelector('#obracun-dnevnica').classList.add('annotate-main-column');
      document.querySelector('#obracun-ostalih-troskova').classList.add('annotate-main-column');
      document.querySelector('#predujam-section').classList.add('annotate-main-column');
      document.querySelector('#person-info-section').classList.add('annotate-main-column');
    } else {
      document.querySelector('#main-date-section').classList.remove('annotate-main-column');
      document.querySelector('#obracun-dnevnica').classList.remove('annotate-main-column');
      document.querySelector('#obracun-ostalih-troskova').classList.remove('annotate-main-column');
      document.querySelector('#predujam-section').classList.remove('annotate-main-column');
      document.querySelector('#person-info-section').classList.remove('annotate-main-column');
    }
  });
  // show hide content
  document.querySelector('#remove-content').addEventListener('click', function() {
    show_hide_content = !show_hide_content;
    show_hide_content
      ? (document.querySelector('#remove-content .remove-content-text').textContent =
          'show-content')
      : (document.querySelector('#remove-content .remove-content-text').textContent =
          'hide-content');
    for (var i = 0; i < document.querySelectorAll('.show-hide').length; i++) {
      show_hide_content
        ? (document.querySelectorAll('.show-hide')[i].style.display = 'none')
        : (document.querySelectorAll('.show-hide')[i].style.display = '');
    }
  });

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
  // plus icon zoom
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
    for (var i = 0; i < document.querySelectorAll('.ch-link').length; i++) {
      nigth_mode_toggle
        ? (document.querySelectorAll('.ch-link')[i].style.color = '#a0d4a0cf')
        : (document.querySelectorAll('.ch-link')[i].style.color = '');
    }
  });
})();

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
