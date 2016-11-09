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
    lacale = locales[locale] || locales[locale.split('-')[0]];
    if( !lacale ) return console.error('[ng-flatpickr] unsupported locale', locale);
  }
  
  if( typeof lacale != 'object' ) return console.error('[ng-flatpickr] locale must be a string or object');
  flatpickr.localize(lacale);
};