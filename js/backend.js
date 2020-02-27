'use strict';

(function () {
  var load = function (successHandler, errorHandler) {
    window.serverRequest.send({
      url: window.constants.ServerUrl.LOAD,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  var save = function (data, successHandler, errorHandler) {
    window.serverRequest.send({
      url: window.constants.ServerUrl.SAVE,
      data: data,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  window.backend = {
    load: load,
    save: save
  };
})();
