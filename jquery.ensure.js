// jquery.ensure.js
  $.ensure = function (selector) {
    var promise = $.Deferred();
    var interval = setInterval(function () {
      if ($(selector)[0]) {
        clearInterval(interval);
        promise.resolve();
      }
    }, 1);
    return promise;
  };

// // my-app.js

//   function runWhenMyElementExists () {
//     // run the code that depends on #my-element
//   }

// $.ensure('#my-element')
//   .then(runWhenMyElementExists);
