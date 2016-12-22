var flatpickr = require('flatpickr');
require('flatpickr/dist/flatpickr.min.css');

module.exports = angular.module('ngFlatpickr', [])
.directive('datepicker', function() {
  return {
    require: '?ngModel',
    restrict : 'A',
    link : function(scope, element, attrs, ngModel) {
      new flatpickr(element[0], {
        allowInput:true,
        onChange: function(dateObject, dateString) {
          if( scope.$root.$$phase != '$digest' && scope.$root.$$phase != '$apply' ) {
            scope.$apply(function() {
              ngModel.$setViewValue(dateString);
            });
          } else {
            ngModel.$setViewValue(dateString);
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
