'use strict';

(function () {
  var getRandomInt = function (maxInt) {
    return Math.floor(Math.random() * maxInt);
  };

  var getRandomIntFromRange = function (minInt, maxInt) {
    return getRandomInt(maxInt - minInt) + minInt;
  };

  var getRandomIntFromRangeIncludingMax = function (minInt, maxInt) {
    return getRandomIntFromRange(minInt, maxInt + 1);
  };

  var getRandomElement = function (array) {
    return array[getRandomIntFromRange(0, array.length)];
  };

  var getRandomElements = function (array) {
    var arrayCopy = array.slice();

    var elementAmount = getRandomIntFromRangeIncludingMax(0, arrayCopy.length);

    var randomElements = [];

    for (var i = 0; i < elementAmount; i++) {
      randomElements.push(extractRandomElement(arrayCopy));
    }

    return randomElements;
  };

  var extractRandomElement = function (array) {
    var randomElementIndex = getRandomIntFromRange(0, array.length);
    var randomElement = array[randomElementIndex];
    array.splice(randomElementIndex, 1);

    return randomElement;
  };

  var checkEnterKey = function (key) {
    return key === window.constants.enterKey;
  };

  var checkEscKey = function (key) {
    return key === window.constants.escKey;
  };

  var checkLeftMouseButton = function (mouseButtonNumber) {
    return mouseButtonNumber === window.constants.leftMouseButtonNumber;
  };

  var checkIfNumInRange = function (num, range) {
    return num >= range.min && num <= range.max;
  };

  var toggleFormFields = function (form, disable) {
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = Boolean(disable);
    }
  };

  window.utils = {
    getRandomIntFromRange: getRandomIntFromRange,
    getRandomIntFromRangeIncludingMax: getRandomIntFromRangeIncludingMax,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    extractRandomElement: extractRandomElement,

    checkEnterKey: checkEnterKey,
    checkEscKey: checkEscKey,
    checkLeftMouseButton: checkLeftMouseButton,

    checkIfNumInRange: checkIfNumInRange,

    toggleFormFields: toggleFormFields
  };
})();
