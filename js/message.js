'use strict';

(function () {
  var createElement = function () {
    var element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '20px';
    element.style.left = '50%';
    element.style.zIndex = '20';

    element.style.display = 'none';
    element.style.borderRadius = '10px';
    element.style.padding = '20px';

    element.style.fontSize = '20px';
    element.style.color = '#ffffff';

    element.style.transform = 'translateX(-50%)';

    return element;
  };

  var element = createElement();

  var render = function () {
    document.body.appendChild(element);
  };

  var hide = function () {
    element.style.display = 'none';
  };

  var timerID;

  var show = function (text, isError) {
    element.textContent = text;

    element.style.backgroundColor = isError ?
      'red' : 'green';

    element.style.display = 'block';

    clearTimeout(timerID);
    timerID = setTimeout(hide, window.constants.timeToHideMessage);
  };

  render();

  window.message = {
    show: show
  };
})();
