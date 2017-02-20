(function() {
  'use strict';

  var pymChild = new pym.Child();

  var sections = document.querySelectorAll('div.data-section');
  var navigate = document.querySelectorAll('span.navigate');

  var div_showing = sections[0];

  function showHide(navigate_button) {
    var target = navigate_button.getAttribute('data-div-id');
    for (var i=0; i<sections.length; i++) {
      sections[i].style.display = 'none';
    };
    var target_div = document.getElementById(target);
    target_div.style.display = 'block';
    pymChild.sendHeight();
    div_showing = target_div;
  }

  for (var e=0; e<navigate.length; e++) {
    navigate[e].addEventListener('click', function() {
      showHide(this);
    });
  };

  document.addEventListener('keyup', function(e) {
    if (+e.keyCode === 37) {
      var back = div_showing.querySelector('span.navigate.navigate-back');
      if (back !== null) {
        showHide(back);
      }
    }
    if (+e.keyCode === 39) {
      var forward = div_showing.querySelector('span.navigate.navigate-forward');
      if (forward !== null) {
        showHide(forward);  
      }
    }
  });

})();
