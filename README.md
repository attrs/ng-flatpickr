# ng-flatpickr

## Install
```sh
$ npm i ng-flatpickr --save
```

```javascript
require('ng-flatpickr')

// with locale
//require('ng-flatpickr').locale('en');

angular.module('app', ['ngFlatpickr'])...
```

```html
<input type="text" datepicker>
<input type="text" datepicker data-date-format="Y-m-d">
<input type="text" datepicker range>
<input type="text" datepicker multiple>
<input type="text" datepicker disable-past-days>
<input type="text" datepicker disable-after-days>
<input type="text" datepicker ng-date-filter="dateFilter($date)">
<input type="text" datepicker range data-date-format="Y-m-d" ng-model="date">

<input type="text" datepicker range disable-past-days data-date-format="Y-m-d" ng-model="date" ng-date-change="dateChanged($date, $value, $picker)" ng-date-select="dateSelected($date)" ng-date-filter="dateFilter($date)">
```