(function() {
  'use strict';

  var pymChild = new pym.Child();

  var sections = document.querySelectorAll('div.data-section');
  var navigate = document.querySelectorAll('span.navigate');

  function showHide(target_div) {
    for (var i=0; i<sections.length; i++) {
      sections[i].style.display = 'none';
    };
    target_div.style.display = 'block';
    pymChild.sendHeight();
  }

  for (var e=0; e<navigate.length; e++) {
    navigate[e].addEventListener('click', function() {
      var target = this.getAttribute('data-div-id');
      var target_div = document.getElementById(target);
      showHide(target_div);
    });
  };

})();
