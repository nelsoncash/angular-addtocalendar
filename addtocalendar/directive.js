/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps.
 *
 * directive
 */
'use strict';

addtocalendar
  .directive('addtocalendar', function () {
    var ical = "ical";
    var gcal = "gcal";
    var outlook = "outlook";
    var yahoo = "yahoo";
    var mscal = "mscal";

    function getTemplate(prefix) {
      return '\
      <div class="btn-group dropdown" ' + prefix + ' on-toggle="toggled(open)">\
        <span\
          ng-class="className || \'btn btn-sm btn-default ' + prefix + '-toggle\'"\
          ' + prefix + '-toggle>\
          {{btnText || \'Add to calendar\'}} <span class="caret"></span>\
        </span>\
        <ul class="dropdown-menu">\
          <li><a ng-click="calendarUrl.dlIcal();addToCalTracking(' + ical + ')" ng-if="calendarUrl.dlIcal">iCalendar</a></li>\
          <li><a href="{{calendarUrl.google}}" ng-click="addToCalTracking(' + gcal + ')" target="_blank">Google Calendar</a></li>\
          <li><a ng-click="calendarUrl.dlIcal()" ng-click="addToCalTracking(' + outlook + ')" ng-if="calendarUrl.dlIcal">Outlook</a></li>\
          <li><a href="{{calendarUrl.yahoo}}" ng-click="addToCalTracking(' + yahoo + ')" target="_blank">Yahoo! Calendar</a></li>\
          <li><a href="{{calendarUrl.microsoft}}" ng-click="addToCalTracking(' + mscal + ')" target="_blank">Microsoft Calendar</a></li>\
        </ul>\
      </div>';
    }

    function resolveTemplate(tElement, tAttrs) {
      if(tAttrs.$attr && tAttrs.$attr['uibDropdown']) {
        return getTemplate('uib-dropdown');
      }
      return getTemplate('dropdown');
    }

    return {
      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@'
      },
      controller: 'AddtocalendarCtrl',
      template: resolveTemplate
    };

  });