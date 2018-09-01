(function() {
  var language_toogle = false;
  // show hide content
  var croatian_array = [
    'Redni broj i datum',
    'redni broj iz google drive sheeta i datum početka putovanja (mm.yyyy)',
    'Osoba',
    'Prezime Ime mora biti odvojeno razmakom kao i Grad država',
    'Obračun dnevnica',
    'Datum',
    '(dd.mm.yyyy) datum polaska',
    'Država',
    '(ne upisivati već izaberite iz dropdowna menu)',
    'Polazak',
    '(dd.mm.yyyy hh:mm)',
    'Povratak',
    '(dd.mm.yyyy hh:mm)',
    'Ostali troškovi',
    'Datum',
    '(dd.mm.yyyy)',
    'Vrsta troška',
    '(kratak opis troška)',
    'Iznos',
    'Tečaj',
    'Currency rate:',
    'Predujam/Kredit',
    '(ukoliko je uzeta neka dodatna svota novaca)'
  ];
  var english_array = [
    'Order number and date',
    'Order number from google drive and trip begin date (mm.yyyy)',
    'Person',
    'Lastname firstname, city, country must be separated with a comma',
    'Travel section',
    'Date',
    '(dd.mm.yyyy) start date',
    'Country',
    '(don&#39;t write here choose from dropdown instead)',
    'Trip start',
    '(dd.mm.yyyy hh:mm)',
    'Trip end',
    '(dd.mm.yyyy hh:mm)',
    'Other expenses',
    'Date',
    '(dd.mm.yyyy)',
    'Expense type',
    '(expense short description)',
    'Amount',
    'Currency',
    'Currency rate:',
    'Loan',
    '(if extra amount taken from a third party)'
  ];
  // ENGLISH
  document.querySelector('#english-language').addEventListener('click', function() {
    for (var i = 0; i < document.querySelectorAll('.eng-cro').length; i++) {
      document.querySelectorAll('.eng-cro')[i].innerHTML = english_array[i];
    }
    // language links info
    document.querySelectorAll('.header-lang')[0].innerHTML = '- decimal values must contain';
    document.querySelectorAll('.header-lang')[1].innerHTML = 'a dot';
    document.querySelectorAll('.header-lang')[2].innerHTML =
      'not a comma, at the end of the year(yyyy) dot character doesn&#39;t exist';
    document.querySelector('#main-heading').innerHTML = 'Travel order';

    // odabir države, select trosak
    document.querySelector('#country-name').placeholder = 'Choose country';
    document.querySelector('#trosak-name').placeholder = 'Expense name';
    document.querySelector('#redni-broj').placeholder = 'num';

    // input section person
    document.querySelectorAll('.person-me')[0].placeholder = 'First Lastname';
    document.querySelectorAll('.person-me')[1].placeholder = 'Title';
    document.querySelectorAll('.person-me')[2].placeholder = 'Job title';
    document.querySelectorAll('.person-me')[3].placeholder = 'City Country';
    document.querySelectorAll('.person-me')[4].placeholder = 'Where (client)';
    document.querySelectorAll('.person-me')[5].placeholder = 'Trip description';
    document.querySelectorAll('.person-me')[6].placeholder = 'Counter begin (Km)';
    document.querySelectorAll('.person-me')[7].placeholder = 'Counter end (Km)';
  });

  // CROATIAN
  document.querySelector('#croatian-language').addEventListener('click', function() {
    for (var i = 0; i < document.querySelectorAll('.eng-cro').length; i++) {
      document.querySelectorAll('.eng-cro')[i].innerHTML = croatian_array[i];
    }

    // language links info
    document.querySelectorAll('.header-lang')[0].innerHTML = '- decimalni iznosi moraju sadržavat';
    document.querySelectorAll('.header-lang')[1].innerHTML = 'točku';
    document.querySelectorAll('.header-lang')[2].innerHTML =
      'ne zarez, na kraju godine (yyyy) nema točke';

    document.querySelector('#main-heading').innerHTML = 'Putni nalog';
    // odabir države, select trosak
    document.querySelector('#country-name').placeholder = 'Odabir države';
    document.querySelector('#trosak-name').placeholder = 'Odabir troška';
    document.querySelector('#redni-broj').placeholder = 'R.br.';

    // input section person
    document.querySelectorAll('.person-me')[0].placeholder = 'Ime Prezime';
    document.querySelectorAll('.person-me')[1].placeholder = 'Zvanje';
    document.querySelectorAll('.person-me')[2].placeholder = 'Naziv radnog mjesta';
    document.querySelectorAll('.person-me')[3].placeholder = 'Grad Drzava';
    document.querySelectorAll('.person-me')[4].placeholder = 'Gdje (kod klijenta-opis)';
    document.querySelectorAll('.person-me')[5].placeholder = 'Dodatan opis putovanja';
    document.querySelectorAll('.person-me')[6].placeholder = 'Početno stanje (Km)';
    document.querySelectorAll('.person-me')[7].placeholder = 'Završno stanje (Km)';
  });
})();
