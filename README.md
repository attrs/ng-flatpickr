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
<input type="text" ng-flatpickr>
<input type="text" ng-flatpickr data-date-format="Y-m-d">
<input type="text" ng-flatpickr data-date-format="Y-m-d H:i">
<input type="text" ng-flatpickr range>
<input type="text" ng-flatpickr multiple>
<input type="text" ng-flatpickr disable-past-days>
<input type="text" ng-flatpickr disable-after-days>
<input type="text" ng-flatpickr ng-date-filter="dateFilter($date)">
<input type="text" ng-flatpickr ng-model="date">
<input type="text" ng-flatpickr enable-time">
<input type="text" ng-flatpickr time24hr">
<input type="text" ng-flatpickr minute-increment="30"">
<input type="text" ng-flatpickr time24hr">
<input type="text" ng-flatpickr no-calendar">

<input type="text" ng-flatpickr range disable-past-days data-date-format="Y-m-d" ng-model="date" ng-date-change="dateChanged($date, $value, $picker)" ng-date-select="dateSelected($date)" ng-date-filter="dateFilter($date)">
```