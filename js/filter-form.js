'use strict';

(function () {
  var form = document.querySelector('.map__filters');

  var activate = function () {
    window.utils.toggleFormFields(form);
  };

  var deactivate = function () {
    form.reset();
    window.utils.toggleFormFields(form, true);
  };

  window.filterForm = {
    activate: activate,
    deactivate: deactivate
  };
})();
