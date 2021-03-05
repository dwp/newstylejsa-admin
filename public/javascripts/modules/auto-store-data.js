'use strict';

/* AutoStoreData */
const AutoStoreData = function () {
  // On form submit, add hidden inputs for checkboxes so the server knows if
  // they've been unchecked. This means we can automatically store and update
  // all form data on the server, including checkboxes that are checked, then
  // later unchecked

  const $form = document.querySelector('form');

  if ($form !== null) {
    $form.addEventListener('submit', () => {
      const $checkboxes = document.querySelectorAll('input[type="checkbox"]');
      let names = {};

      $checkboxes.forEach(function ($el, index) {
        if (!names[$el.getAttribute('name')]) {
          names[$el.getAttribute('name')] = true;

          const $input = document.createElement('input');
          $input.setAttribute('type', 'hidden');
          $input.setAttribute('name', $el.getAttribute('name'));
          $input.setAttribute('value', '_unchecked');

          document.body.appendChild($input);
        };
      });
    });
  }
};

export default {
  init: AutoStoreData
};
