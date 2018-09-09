(function() {
  var obracunDnevniceArray = [
    'Br.',
    'Datum',
    'Država',
    'Polazak',
    'Povratak',
    'Sati',
    'Dnevnice',
    'Jedinične <br/>Dnevnice',
    'Iznos u Kn'
  ];

  var obracunOstaliArray = [
    'Br.',
    'Datum',
    'Vrsta troška',
    'Iznos',
    'Valuta',
    'Tečaj',
    'Iznos u Kn'
  ];

  renderPrintButton('PRINT DOCUMENT');

  var zeroContainer = document.createElement('div');
  zeroContainer.setAttribute('id', 'zero-print-container');
  zeroContainer.style = 'margin-bottom:1000px;';
  document.body.appendChild(zeroContainer);

  var mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-print-container');
  document.body.appendChild(mainContainer);

  // FIRST PAGE -- PERSON INFO PAGE
  setCompanyLogo(
    'https://global-uploads.webflow.com/5ad0acc69f356a98471287a3/5ae073d500595f83d49e713a_logo_Comsysto-Reply_color.svg',
    'zero-print-container'
  );
  setCompanyAddress(
    'Comsysto Reply d.o.o. &#8226; Ilirska 33 &#8226;  10000 Zagreb &#8226; comsystoreply.de &#8226; office-zg.comsysto@reply.de',
    'zero-print-container'
  );
  setIntroHeader(
    'PUTNI RAČUN',
    JSON.parse(localStorage.getItem('first-section'))[1].replace('.', '/'),
    'Br.:' + JSON.parse(localStorage.getItem('first-section'))[0],
    'zero-print-container'
  );

  setPersonInfoTable(JSON.parse(localStorage.getItem('first-section')));
  setPersonFooter();

  // SECOND PAGE -- TRAVEL EXPENSE PAGE
  setCompanyLogo(
    'https://global-uploads.webflow.com/5ad0acc69f356a98471287a3/5ae073d500595f83d49e713a_logo_Comsysto-Reply_color.svg',
    'main-print-container'
  );
  setCompanyAddress(
    'Comsysto Reply d.o.o. &#8226; Ilirska 33 &#8226;  10000 Zagreb &#8226; comsystoreply.de &#8226; office-zg.comsysto@reply.de',
    'main-print-container'
  );
  setIntroHeader(
    'PUTNI RAČUN',
    JSON.parse(localStorage.getItem('first-section'))[1].replace('.', '/'),
    'Br.:' + JSON.parse(localStorage.getItem('first-section'))[0],
    'main-print-container'
  );

  setIntermediateHeader();
  if (JSON.parse(localStorage.getItem('obracun-table')).length > 1) {
    generateTable(
      JSON.parse(localStorage.getItem('obracun-table')).length,
      JSON.parse(localStorage.getItem('obracun-table')),
      300,
      obracunDnevniceArray,
      'OBRAČUN DNEVNICE',
      9,
      'obracun-table'
    );
  }
  if (JSON.parse(localStorage.getItem('ostali-table')).length > 1) {
    generateTable(
      JSON.parse(localStorage.getItem('ostali-table')).length,
      JSON.parse(localStorage.getItem('ostali-table')),
      300,
      obracunOstaliArray,
      'OBRAČUN OSTALIH TROŠKOVA',
      7,
      'ostali-table'
    );
  }

  overallPriceDisplay(getTotalSumValue(), localStorage.getItem('kredit-value'));
  setSignatureForm();
})();

// PERSON INFORMATION BEGIN

function setPersonInfoTable(storageArray) {
  var array_left = [
    '',
    '',
    'Određujem da:',
    'Zvanje: ',
    'Radno mjesto:',
    'Datum polaska:',
    'u:',
    'opis:',
    'Početno stanje brojila km: ',
    'Završno stanje brojila km: '
  ];
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');
  container.style =
    'border: 2px solid #e2e1e1;margin-left:0px; margin-right:0px;margin-bottom:30px;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column');
  div_2.style = 'border-left: 1px solid #d8d4d4;';

  for (var i = 2; i < storageArray.length; i++) {
    if (storageArray[i] !== '') {
      var column_left = document.createElement('p');
      column_left.className = 'person-info-table-left';
      column_left.innerHTML = array_left[i];
      div_1.appendChild(column_left);

      var column_right = document.createElement('p');
      column_right.className = 'mg-btm-5';
      column_right.innerHTML = storageArray[i];
      div_2.appendChild(column_right);
    }
  }

  container.appendChild(div_1);
  container.appendChild(div_2);
  document.querySelector('#zero-print-container').appendChild(container);
}

function setPersonFooter() {
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');

  container.style =
    'border: 1px solid rgb(231, 229, 229);background: rgb(239, 239, 239);position: absolute;right: 0; bottom: 0;left: 0;background-color: #efefef;text-align: center;margin-bottom: 10px;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');
  var div_3 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column center');
  div_3.setAttribute('class', 'column center');

  div_2.style = 'border-left: 2px solid #ffffff;';
  div_3.style = 'border-left: 2px solid #ffffff;';

  div_1.innerHTML = 'Zagreb, ' + getDateFormatDDMMYYYY();
  div_2.innerHTML = 'M.P';

  var span_3 = document.createElement('span');
  span_3.innerHTML = 'Nalogodavac';
  span_3.style = 'position:relative;border-top:1px solid grey;top:10px;padding-top:2px;';

  div_3.appendChild(span_3);

  container.appendChild(div_1);
  container.appendChild(div_2);
  container.appendChild(div_3);

  document.querySelector('#zero-print-container').appendChild(container);
}

// PERSON INFORMATION END

// TRAVEL INFORMATION PART
function appendBackButton() {
  var newdiv = document.createElement('div');
  newdiv.innerHTML = 'go back';
  newdiv.setAttribute('class', 'print-only back-button');
  newdiv.style = 'display:inline-block;';

  document.querySelector('#main-print-container').appendChild(newdiv);
}

function appendPrintButton() {
  var newdiv = document.createElement('div');
  newdiv.innerHTML = 'print';
  newdiv.setAttribute('class', 'print-only back-button');
  newdiv.style = 'background: #3273dc;display: inline-block;text-align:center';
  newdiv.addEventListener('click', function() {
    window.print();
  });

  document.querySelector('#main-print-container').appendChild(newdiv);
}

function generateTable(rowNum, data, totalValue, headerNamesArray, tableTitle, cellnum, storeID) {
  var cnt = 0;
  setTableTitle(tableTitle);
  var cellNumber = cellnum;

  var table = document.createElement('table');
  table.style = 'width:100%;margin-left:0px;margin-right:0px';

  for (var i = 0; i < rowNum; i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    var newData = data[i];
    for (var j = 0; j < cellNumber; j++) {
      var td = document.createElement('td');
      td.style = 'text-align:center;';
      if (i === 0) {
        td.style = 'font-weight:600;text-align:center;padding:2px;font-size:15px;';
        td.innerHTML = headerNamesArray[j];
      } else {
        if (j === 0) {
          td.innerHTML = ++cnt + '.';
          tr.appendChild(td);
        }
        // improve this it's bad
        if (newData[j]) {
          var td = document.createElement('td');
          td.style = 'text-align:center;padding:2px';
          if (storeID === 'obracun-table') {
            if (j === 4) {
              td.innerHTML = newData[j].substring(0, newData[j].length - 2);
            } else if (j > 3) td.innerHTML = handleMoreThan3Digit(replaceDot(newData[j]));
            else td.innerHTML = newData[j];
          } else if (storeID === 'ostali-table') {
            if (j > 1) td.innerHTML = handleMoreThan3Digit(replaceDot(newData[j]));
            else td.innerHTML = newData[j];
          }
        }
      }
      if (td.innerHTML.trim()) {
        tr.appendChild(td);
      }
    }
  }
  document.querySelector('#main-print-container').appendChild(table);
  setResultFooter(
    'Ukupno:',
    handleMoreThan3Digit(replaceDot(getSubAmountValue(storeID).toFixed(2))) + ' HRK'
  );
}

function setTableTitle(titleTxt) {
  var title = document.createElement('h2');
  title.innerHTML = titleTxt;
  title.style = 'font-size:15px;font-weight:600;margin-bottom:10px;';
  document.querySelector('#main-print-container').appendChild(title);
}

function setCompanyLogo(imgPath, id) {
  var image = document.createElement('img');
  image.setAttribute('src', imgPath);
  image.setAttribute('id', 'logo');

  document.querySelector('#' + id).appendChild(image);
}

function setCompanyAddress(address, id) {
  var adr = document.createElement('p');
  adr.setAttribute('class', 'center');
  adr.style = 'color:grey;margin-top:10px;font-size:12px;margin-bottom:30px';
  adr.innerHTML = address;

  document.querySelector('#' + id).appendChild(adr);
}

function setIntroHeader(titleTxt, dateTxt, numberTxt, id) {
  // parent
  var container = document.createElement('div');
  container.setAttribute('class', 'intro-header-container');
  // childs
  var title = document.createElement('span');
  title.setAttribute('class', 'travel-txt center blc');
  title.innerHTML = titleTxt;

  var date = document.createElement('span');
  date.setAttribute('class', 'travel-rest center blc');
  date.innerHTML = dateTxt;

  var number = document.createElement('span');
  number.setAttribute('class', 'travel-rest center blc');
  number.innerHTML = numberTxt;

  container.appendChild(title);
  container.appendChild(date);
  container.appendChild(number);

  document.querySelector('#' + id).appendChild(container);
}

function setIntermediateHeader() {
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');
  container.style =
    'border: 2px solid #e2e1e1;margin-left:0px; margin-right:0px;margin-bottom:30px;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column');
  div_2.style = 'border-left: 2px solid #d8d4d4;';

  div_1.innerHTML = 'Prema putnom nalogu:';
  div_2.innerHTML =
    JSON.parse(localStorage.getItem('first-section'))[1].replace('.', '/') +
    ', Br.:' +
    JSON.parse(localStorage.getItem('first-section'))[0];

  container.appendChild(div_1);
  container.appendChild(div_2);
  document.querySelector('#main-print-container').appendChild(container);
}

function setResultFooter(leftElementContent, rightElementContent) {
  // create placeholder
  var divElement = document.createElement('div');
  divElement.style = 'background-color:#209cee30;padding:5px;margin-top:15px;margin-bottom:35px;';
  // create left element
  var leftElement = document.createElement('span');
  leftElement.style = 'font-weight:600;font-size:15px;';
  leftElement.innerHTML = leftElementContent;
  divElement.appendChild(leftElement);

  // create right element
  var rightElement = document.createElement('span');
  rightElement.style = 'clear:left;float:right; font-weight:600; font-size:15px';
  rightElement.classList.add('take-me');
  rightElement.innerHTML = rightElementContent;

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);

  document.querySelector('#main-print-container').appendChild(divElement);
}

function overallPriceDisplay(totalSum, predujamValue) {
  container = document.createElement('div');
  container.style = 'background-color:#209cee30;width:100%%;margin-left:30%;margin-top:30px;';
  container.setAttribute('class', 'columns');

  var leftElement = document.createElement('div');
  var rightElement = document.createElement('div');

  leftElement.setAttribute('class', 'column is-two-thirds');
  rightElement.setAttribute('class', 'column');
  rightElement.style = 'border-left: 1px solid #d8d4d4;';

  var first = document.createElement('span');
  first.setAttribute('class', 'blc float-right');
  var second = document.createElement('span');
  second.setAttribute('class', 'blc float-right');
  var fourth = document.createElement('span');
  fourth.setAttribute('class', 'blc float-right fw-600');
  fourth.style = 'margin-top:20px;';

  var first_p = document.createElement('span');
  first_p.setAttribute('class', 'blc');
  var second_p = document.createElement('span');
  second_p.setAttribute('class', 'blc');
  var fourth_p = document.createElement('span');
  fourth_p.style = 'margin-top:20px;';
  fourth_p.setAttribute('class', 'blc fw-600');

  first.innerHTML = 'Ukupni troškovi:';
  second.innerHTML = 'Ukupno primljeni predujam:';
  fourth.innerHTML = 'Ostaje za isplatu / vraćanje u kn:';

  first_p.innerHTML = handleMoreThan3Digit(replaceDot(totalSum)) + ' HRK';
  second_p.innerHTML = predujamValue ? handleMoreThan3Digit(replaceDot(predujamValue)) : '0,00 HRK';
  if (!predujamValue) {
    fourth_p.innerHTML = handleMoreThan3Digit(replaceDot(totalSum)) + ' HRK';
  } else {
    var outputValue = totalSum - predujamValue;
    fourth_p.innerHTML = handleMoreThan3Digit(replaceDot(outputValue)) + ' HRK';
  }
  // appending
  leftElement.appendChild(first);
  leftElement.appendChild(second);
  leftElement.appendChild(fourth);

  rightElement.appendChild(first_p);
  rightElement.appendChild(second_p);

  rightElement.appendChild(fourth_p);

  container.appendChild(leftElement);
  container.appendChild(rightElement);

  document.querySelector('#main-print-container').appendChild(container);
}

function setSignatureForm() {
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');

  container.style =
    'border: 1px solid rgb(231, 229, 229);background: rgb(239, 239, 239);top:328px;right: 0; bottom: 0;left: 0;background-color: #efefef;text-align: center;margin-bottom: 10px;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column');
  div_1.innerHTML = 'Zagreb, ' + getDateFormatDDMMYYYY();
  div_2.style = 'border-left: 2px solid #d8d4d4;';

  var div2_container = document.createElement('div');
  div2_container.setAttribute('class', 'columns');
  div2_container.style = 'border-left: 2px solid white;';

  var div2_one = document.createElement('div');
  div2_one.setAttribute('class', 'column center');

  var span1 = document.createElement('span');
  span1.innerHTML = 'Podnositelj računa';
  span1.style = 'position:relative;border-top:1px solid grey;top:10px;padding-top:2px;';

  div2_one.appendChild(span1);

  var div2_two = document.createElement('div');
  div2_two.setAttribute('class', 'column center');

  var span2 = document.createElement('span');
  span2.innerHTML = 'Naredbodavac';
  span2.style = 'position:relative;border-top:1px solid grey;top:10px;padding-top:2px;';

  div2_two.appendChild(span2);

  div_2.appendChild(div2_one);
  div_2.appendChild(div2_two);

  div2_container.appendChild(div2_one);
  div2_container.appendChild(div2_two);

  var div_par = document.createElement('div');
  div_par.setAttribute('class', 'column');
  div_par.appendChild(div2_container);

  container.appendChild(div_1);
  container.appendChild(div_par);

  var wrapperContainer = document.createElement('div');
  wrapperContainer.classList.add('signature-wrapper');
  wrapperContainer.appendChild(container);

  document.querySelector('#main-print-container').appendChild(wrapperContainer);
}

function getSubAmountValue(localStorageId) {
  var outputSum = 0;
  var multiArray = JSON.parse(localStorage.getItem(localStorageId));
  for (var i = 0; i < multiArray.length; i++) {
    var singleArr = multiArray[i];
    if (singleArr.length !== 0) {
      outputSum += parseFloat(singleArr[singleArr.length - 1].toString().trim());
    }
  }
  return outputSum;
}

function getTotalSumValue() {
  if (document.querySelectorAll('.take-me')[1] && document.querySelectorAll('.take-me')[0]) {
    return (
      parseFloat(
        document
          .querySelectorAll('.take-me')[0]
          .innerHTML.trim()
          .substring(0, document.querySelectorAll('.take-me')[0].innerHTML.indexOf('H'))
          .trim()
          .replace('.', '')
          .replace(',', '.')
      ) +
      parseFloat(
        document
          .querySelectorAll('.take-me')[1]
          .innerHTML.trim()
          .substring(0, document.querySelectorAll('.take-me')[1].innerHTML.indexOf('H'))
          .trim()
          .replace('.', '')
          .replace(',', '.')
      )
    ).toFixed(2);
  }
  return document
    .querySelectorAll('.take-me')[0]
    .innerHTML.trim()
    .substring(0, document.querySelectorAll('.take-me')[0].innerHTML.indexOf('H'))
    .trim()
    .replace('.', '')
    .replace(',', '.');
}

function getDateFormatDDMMYYYY() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '.' + mm + '.' + yyyy;
}

function replaceDot(value) {
  // remove this later
  value = value.toString();
  newValue = '';
  for (var i = 0; i < value.length; i++) {
    newValue += value[i].replace('.', ',');
  }
  return newValue;
}

function handleMoreThan3Digit(value) {
  // remove this later
  value = value.toString();

  // 10.000
  if (parseInt(value.substring(0, 5)) / 10000 >= 1) {
    var part_2 = value.substring(2, value.length);
    var part_1 = value[0] + value[1] + '.';
    return part_1 + part_2;
  }
  // 1000
  if (parseInt(value.substring(0, 4)) / 1000 >= 1) {
    var part_2 = value.substring(1, value.length);
    var part_1 = value[0] + '.';
    return part_1 + part_2;
  }
  return value;
}
function renderPrintButton(text) {
  var extraString = `
  <div style="font-size:14px; color:black">
  <p>Layout: portrait</p>
  <p>Colour: colour</p>
  <p>Paper size: A4</p>
  <p>Margins: Default</p>
  <p>Scale: 109</p>
  <div>Options:
      <p>uncheck:Header and footers, Two-sided</p>
      <p>check: Background graphics</p>
  </div>
</div>`;
  var button = document.createElement('div');
  button.className = 'print-document';
  button.innerHTML = text + extraString;

  button.addEventListener('click', function() {
    window.print();
  });
  document.body.appendChild(button);
}
