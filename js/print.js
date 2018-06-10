(function() {
  // ligth blue color: background-color:#209cee30;
  var mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-print-container');
  document.body.appendChild(mainContainer);
  appendBackButton();
  appendPrintButton();
  setCompanyLogo('https://global-uploads.webflow.com/5ad0acc69f356a98471287a3/5ae073d500595f83d49e713a_logo_Comsysto-Reply_color.svg');
  setCompanyAddress('Comsysto d.o.o. &#8226; Ilirska33 &#8226;  10000Zagreb &#8226; www.comsysto.com &#8226; kontakt@comsysto.com');

  setIntroHeader('PUTNI RACUN', '12/2017', 'Br.: 47');
  setIntermediateHeader();
  var obracunDnevniceArray = ['Br.', 'Datum', 'Drzava', 'Polazak', 'Povratak', 'Sati', 'Dnevnice', 'Jedinicne <br/>Dnevnice', 'Iznos u kn'];

  generateTable(10, [0, 1, 2, 3, 4, 5, 6, 7, 8], 300, obracunDnevniceArray);
  generateTable(10, [0, 1, 2, 3, 4, 5, 6, 7, 8], 300, obracunDnevniceArray);
  generateTable(10, [0, 1, 2, 3, 4, 5, 6, 7, 8], 300, obracunDnevniceArray);

  overallPriceDisplay();

  setSignatureForm();
})();

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
function generateTable(rowNum, data, totalValue, headerNamesArray) {
  // id= .add-obracun
  var cnt = 0;
  setTableTitle('OBRACUN DEVNICE');
  var cellNumber = 9;
  // dataObj= {datum:'', drzava:'', polazak:'', povratak:''};
  var table = document.createElement('table');
  table.style = 'width:100%;margin-left:0px;margin-right:0px';
  for (var i = 0; i < rowNum; i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for (var j = 0; j < cellNumber; j++) {
      var td = document.createElement('td');
      td.style = 'text-align:center;';
      if (i === 0) {
        td.style = 'font-weight:600;text-align:center';
        td.innerHTML = headerNamesArray[j];
      } else {
        if (!j) {
          td.innerHTML = ++cnt;
        } else {
          td.innerHTML = data[j];
        }
      }
      tr.appendChild(td);
    }
  }
  document.querySelector('#main-print-container').appendChild(table);
  setResultFooter('Ukupno', '183 HRK');
}

function setTableTitle(titleTxt) {
  var title = document.createElement('h2');
  title.innerHTML = titleTxt;
  title.style = 'font-size: 17px;font-weight: 600;margin-bottom:10px;';
  document.querySelector('#main-print-container').appendChild(title);
}

function setCompanyLogo(imgPath) {
  var image = document.createElement('img');
  image.setAttribute('src', imgPath);
  image.setAttribute('id', 'logo');

  document.querySelector('#main-print-container').appendChild(image);
}
function setCompanyAddress(address) {
  var adr = document.createElement('p');
  adr.setAttribute('class', 'center');
  adr.style = 'color:grey;margin-top:10px;font-size:13px;margin-bottom:30px';
  adr.innerHTML = address;

  document.querySelector('#main-print-container').appendChild(adr);
}
function setIntroHeader(titleTxt, dateTxt, numberTxt) {
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

  document.querySelector('#main-print-container').appendChild(container);
}
function setIntermediateHeader() {
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');
  container.style = 'border: 2px solid #e2e1e1;margin-left:0px; margin-right:0px;margin-bottom:30px;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column');
  div_2.style = 'border-left: 2px solid #d8d4d4;';

  div_1.innerHTML = 'Prema putnom nalogu:';
  div_2.innerHTML = '12/2017, Br.:47';

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
  leftElement.style = 'font-weight:600;';
  leftElement.innerHTML = leftElementContent;
  divElement.appendChild(leftElement);

  // create right element
  var rightElement = document.createElement('span');
  rightElement.style = 'clear:left;float:right; font-weight:600;';
  rightElement.innerHTML = rightElementContent;

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);

  document.querySelector('#main-print-container').appendChild(divElement);
}
function overallPriceDisplay() {
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
  var third = document.createElement('span');
  third.setAttribute('class', 'blc float-right');
  var fourth = document.createElement('span');
  fourth.setAttribute('class', 'blc float-right fw-600');
  fourth.style = 'margin-top:20px;';

  var first_p = document.createElement('span');
  first_p.setAttribute('class', 'blc');
  var second_p = document.createElement('span');
  second_p.setAttribute('class', 'blc');
  var third_p = document.createElement('span');
  third_p.setAttribute('class', 'blc');
  var fourth_p = document.createElement('span');
  fourth_p.style = 'margin-top:20px;';
  fourth_p.setAttribute('class', 'blc fw-600');

  first.innerHTML = 'Ukupni troškovi:';
  second.innerHTML = 'Ukupno primljeni predujam:';
  third.innerHTML = 'Ukupno nepriznatih troškova:';
  fourth.innerHTML = 'Ostaje za isplatu / vracanje u kn:';

  first_p.innerHTML = '2103,00kn';
  second_p.innerHTML = '2103,00kn';
  third_p.innerHTML = '2103,00kn';
  fourth_p.innerHTML = '2103,00kn';

  // appending
  leftElement.appendChild(first);
  leftElement.appendChild(second);
  leftElement.appendChild(third);
  leftElement.appendChild(fourth);

  rightElement.appendChild(first_p);
  rightElement.appendChild(second_p);
  rightElement.appendChild(third_p);
  rightElement.appendChild(fourth_p);

  container.appendChild(leftElement);
  container.appendChild(rightElement);

  document.querySelector('#main-print-container').appendChild(container);
}
function setSignatureForm() {
  var container = document.createElement('div');
  container.setAttribute('class', 'columns');
  container.style = 'border: 1px solid #e7e5e5;margin-left:0px;margin-right:0px;margin-bottom:30px; margin-top:80px;background: #efefef;';

  var div_1 = document.createElement('div');
  var div_2 = document.createElement('div');

  div_1.setAttribute('class', 'column');
  div_2.setAttribute('class', 'column');
  div_1.innerHTML = 'Zagreb, 08.12.2017.';
  div_2.style = 'border-left: 2px solid #d8d4d4;';

  var div2_container = document.createElement('div');
  div2_container.setAttribute('class', 'columns');
  div2_container.style = 'border-left: 2px solid white;';

  var div2_one = document.createElement('div');
  div2_one.setAttribute('class', 'column center');

  var span1 = document.createElement('span');
  span1.innerHTML = 'Podnositelj racuna';
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

  document.querySelector('#main-print-container').appendChild(container);
}

function displayOverallCalculation() {
  var divElement = document.createElement('table');
}

function generateFooterSignature() {}
