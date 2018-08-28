(function() {
  var language_toogle = false;
  // show hide content
  var croatian_array = [
    'Redni broj i datum',
    'redni broj iz google drive sheeta i datum početka putovanja (mm.yyyy)',
    'Osoba',
    'Prezime Ime mora biti odvojeno razmakom kao i Grad država',
    'obračun dnevnica',
    'Datum',
    '(dd.mm.yyyy) datum polaska',
    'Država',
    '(ne upisivati već izaberite iz dropdowna menu)',
    'Polazak',
    '(dd.mm.yyyy hh:mm)',
    'Povratak',
    '(dd.mm.yyyy hh:mm)',
    'ostali troškovi',
    'Datum',
    '(dd.mm.yyyy)',
    'Vrsta troška',
    '(kratak opis troška)',
    'Iznos',
    'Tečaj',
    'Currency rate:',
    'predujam/kredit',
    '(ukoliko je uzeta neka dodatna svota novaca)'
  ];
  var english_array = [
    'Order number and date',
    'Order number from google drive and trip begin date(mm.yyyy)',
    'Person',
    'Lastname firstname, city, country must be separated with a comma',
    'Trip accountment',
    'Date',
    '(dd.mm.yyyy) start date',
    'Country',
    '(dont write here choose from dropdown instead)',
    'Trip start',
    '(dd.mm.yyyy hh:mm)',
    'Trip end',
    '(dd.mm.yyyy hh:mm)',
    'other expenses',
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
      'not a comma, at the end of the year(yyyy) dot character doesnt exist';
    // odabir države
    // select trosak
    document.querySelector('#country-name').placeholder = 'Choose country';
    document.querySelector('#trosak-name').placeholder = 'Expense name';
  });

  document.querySelector('#croatian-language').addEventListener('click', function() {
    for (var i = 0; i < document.querySelectorAll('.eng-cro').length; i++) {
      document.querySelectorAll('.eng-cro')[i].innerHTML = croatian_array[i];
    }

    // language links info
    console.log(document.querySelectorAll('.header-lang').length);
    document.querySelectorAll('.header-lang')[0].innerHTML = '- decimalni iznosi moraju sadržavat';
    document.querySelectorAll('.header-lang')[1].innerHTML = 'točku';
    document.querySelectorAll('.header-lang')[2].innerHTML =
      'ne zarez, na kraju godine (yyyy) nema točke';

    // odabir države
    // select trosak
    document.querySelector('#country-name').placeholder = 'Odabir države';
    document.querySelector('#trosak-name').placeholder = 'Odabir troška';
  });
})();
