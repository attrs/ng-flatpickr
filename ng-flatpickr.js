var flatpickr = require('flatpickr');
require('flatpickr/dist/flatpickr.min.css');

var _MS_PER_DAY = 1000 * 60 * 60 * 24;
function diff(a, b) {
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = angular.module('ngFlatpickr', [])
.directive('datepicker', function() {
  return {
    require: '?ngModel',
    restrict : 'A',
    link : function(scope, element, attrs, ngModel) {
      var range = 'range' in attrs ? true : false;
      var multiple = 'multiple' in attrs ? true : false;
      var disables = [];
      
      if( 'disablePastDays' in attrs ) {
        disables.push(function(date) {
          return diff(new Date(), date) < 0;
        });
      }
      
      if( 'disableFutureDays' in attrs ) {
        disables.push(function(date) {
          return diff(new Date(), date) > 0;
        });
      }
      
      new flatpickr(element[0], {
        allowInput: true,
        mode: range ? 'range' : (multiple ? 'multiple' : ''),
        inline: 'inline' in attrs ? true : false,
        weekNumbers: 'weekNumbers' in attrs ? true : false,
        disable: disables,
        onChange: function(dateObject, dateString) {
          console.log('dateObject', dateObject, dateString);
          if( scope.$root.$$phase != '$digest' && scope.$root.$$phase != '$apply' ) {
            scope.$apply(function() {
              ngModel.$setViewValue(dateObject);
            });
          } else {
            ngModel.$setViewValue(dateObject);
          }
        }
      });
    }
  };
});

module.exports.locale = function(locale) {
  var locales = require('./locales/');
  if( typeof locale == 'string' ) {
    locale = locales[locale] || locales[locale.split('-')[0]];
    if( !locale ) return console.warn('[ng-flatpickr] unsupported locale', locale);
  }
  
  if( typeof locale !== 'object' ) return console.warn('[ng-flatpickr] locale must be a string or object', locale);
  flatpickr.localize(locale);
};
