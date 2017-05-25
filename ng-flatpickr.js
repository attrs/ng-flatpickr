var flatpickr = require('flatpickr');
require('flatpickr/dist/flatpickr.min.css');

var _MS_PER_DAY = 1000 * 60 * 60 * 24;
function diff(a, b) {
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function ensure(scope, done) {
  if( scope.$$phase == '$apply' || scope.$$phase == '$digest' || scope.$root.$$phase == '$apply' || scope.$root.$$phase == '$digest' ) {
    done(null, scope);
  } else {
    scope.$apply(function() {
      done(null, scope);
    });
  }
}

module.exports = angular.module('ngFlatpickr', [])
.directive('datepicker', function() {
  return {
    require: '?ngModel',
    restrict : 'A',
    link : function(scope, element, attrs, ngModel) {
      var range = 'range' in attrs;
      var multiple = 'multiple' in attrs;
      var valueType = attrs.valueType;
      var ngDateSelect = attrs.ngDateSelect;
      var ngDateChange = attrs.ngDateChange;
      var ngClose = attrs.ngClose;
      var ngDateFilter = attrs.ngDateFilter;
      var ngMonthChange = attrs.ngMonthChange;
      var ngYearChange = attrs.ngYearChange;
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
      
      if( ngDateFilter ) {
        disables.push(function(date) {
          return scope.$eval(ngDateFilter, {$picker: picker, $date: date});
        });
      }
      
      var options = {
        static: 'static' in attrs,
        allowInput: true,
        inline: 'inline' in attrs,
        weekNumbers: 'weekNumbers' in attrs,
        disable: disables,
        onYearChange: function() {
          if( ngYearChange ) {
            scope.$eval(ngYearChange, {$picker: picker, $year: picker.currentYear, $month: picker.currentMonth });
          }
        },
        onMonthChange: function() {
          if( ngMonthChange ) {
            scope.$eval(ngMonthChange, {$picker: picker, $year: picker.currentYear, $month: picker.currentMonth });
          }
        },
        onChange: function(dateObject, dateString, picker) {
          if( ngDateSelect ) {
            scope.$eval(ngDateSelect, {$picker: picker, $date: dateObject && dateObject[dateObject.length - 1], $value: dateString});
          }
          
          if( !multiple && !range ) dateObject = dateObject[0];
          if( range && (!dateObject || dateObject.length < 2) ) return;
          
          if( ngDateChange ) {
            scope.$eval(ngDateChange, {$picker: picker, $date: dateObject, $value: dateString});
          }
          
          if( ngModel ) {
            ensure(scope, function() {
              if( valueType === 'date' ) {
                ngModel.$setViewValue(dateObject);
              } else {
                ngModel.$setViewValue(dateString);
              }
              
              ngModel.$render();
            });
          }
          
          if( !multiple ) picker.close();
        },
        onClose: function(dateObject, dateString, picker) {
          if( !multiple && !range ) dateObject = dateObject[0];
          
          if( multiple ) {
            if( ngDateChange ) {
              scope.$eval(ngDateChange, {$picker: picker, $date: dateObject, $value: dateString});
            }
            
            if( ngModel ) {
              ensure(scope, function() {
                if( valueType === 'date' ) {
                  ngModel.$setViewValue(dateObject);
                } else {
                  ngModel.$setViewValue(dateString);
                }
                
                ngModel.$render();
              });
            }
          }
          
          if( ngClose ) {
            scope.$eval(ngClose, {$picker: picker, $date: dateObject, $value: dateString});
          }
        }
      };
      
      if( range || multiple ) {
        options.mode = range ? 'range' : 'multiple';
      }
      
      var picker = new flatpickr(element[0], options);
      element[0].picker = function() {
        return picker;
      };
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
