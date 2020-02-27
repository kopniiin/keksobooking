'use strict';

(function () {
  var createRequest = function (parameters) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = window.constants.serverResponseTimeout;

    var successHandler = parameters.successHandler;
    var errorHandler = parameters.errorHandler;

    var xhrLoadHandler = function () {
      if (xhr.status === window.constants.ServerResponseStatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler(
            'Что-то пошло не по плану. Статус ответа: ' + xhr.status
        );
      }
    };

    var xhrErrorHandler = function () {
      errorHandler('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      errorHandler('Время ожидания ответа истекло');
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', xhrErrorHandler);
    xhr.addEventListener('timeout', xhrTimeoutHandler);

    return xhr;
  };

  var send = function (parameters) {
    var xhr = createRequest(parameters);

    if (parameters.data) {
      xhr.open('POST', parameters.url);
      xhr.send(parameters.data);
    } else {
      xhr.responseType = 'json';
      xhr.open('GET', parameters.url);
      xhr.send();
    }
  };

  window.serverRequest = {
    send: send
  };
})();
