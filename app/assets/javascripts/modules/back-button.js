'use strict';

/* BackButton */
const BackButton = function () {
  const $backButton = document.querySelectorAll('.govuk-back-link, .js-still-apply');

  if ($backButton !== null) {
    $backButton.addEventListener('click', function (event) {
      event.preventDefault();
      window.history.go(-1);
    });
  };
};

export default {
  init: BackButton
};
