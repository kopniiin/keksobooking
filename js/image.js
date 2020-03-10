'use strict';

(function () {
  var checkFileType = function (fileName) {
    return window.constants.allowedFileTypes.some(function (type) {
      return fileName.endsWith(type);
    });
  };

  var create = function (parameters) {
    var image = document.createElement('img');
    image.width = parameters.width;
    image.height = parameters.height;
    image.alt = parameters.alt;

    if (parameters.src) {
      image.src = parameters.src;
    }

    return image;
  };

  var render = function (element, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      element.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var show = function (element, file) {
    var isAllowed = checkFileType(file.name.toLowerCase());

    if (isAllowed) {
      render(element, file);
    }
  };

  window.image = {
    create: create,
    show: show
  };
})();
