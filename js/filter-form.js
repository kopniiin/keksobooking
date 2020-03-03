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

  var getFilters = function () {
    var formData = new FormData(form);

    return {
      type: formData.get('housing-type'),
      price: formData.get('housing-price'),
      roomAmount: formData.get('housing-rooms'),
      guestAmount: formData.get('housing-guests'),
      features: formData.getAll('features')
    };
  };

  var formChangeHandler = function (evt) {
    window.app.notify(form, evt.type);
  };

  form.addEventListener('change', formChangeHandler);

  window.filterForm = {
    activate: activate,
    deactivate: deactivate,
    getFilters: getFilters
  };
})();
