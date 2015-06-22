angular.module('jshor.angular-addtocalendar', [])
	.controller('AddtocalendarCtrl', function($scope) {
		var cal = ics();
		$scope.description = $scope.description || '';
		$scope.getIcsCalendarUrl = function() {
			cal.addEvent($scope.title, $scope.description, $scope.location, new Date($scope.startDate), new Date($scope.endDate));
			return cal.download(encodeURI($scope.title.replace(/ /g, '_')));
		};

		var getYahooCalendarUrl = function() {
			var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
			yahooCalendarUrl += '&title=' + encodeURI($scope.title);
			yahooCalendarUrl += '&st=' + encodeURI($scope.startDate) + '&et=' + encodeURI($scope.endDate);
			yahooCalendarUrl += '&desc=' + encodeURI($scope.description);
			yahooCalendarUrl += '&in_loc=' + encodeURI($scope.location);

			return yahooCalendarUrl;
		};

		var getGoogleCalendarUrl = function() {
			var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
			googleCalendarUrl += '&text=' + encodeURI($scope.title);
			googleCalendarUrl += '&dates=' + encodeURI($scope.startDate) + '/' + encodeURI($scope.endDate);
			googleCalendarUrl += '&details=' + encodeURI($scope.description);
			googleCalendarUrl += '&location=' + encodeURI($scope.location);

			return googleCalendarUrl;
		};

		var getMicrosoftCalendarUrl = function() {
			var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
			microsoftCalendarUrl += '&summary=' + encodeURI($scope.title);
			microsoftCalendarUrl += '&dtstart=' + encodeURI($scope.startDate) + '&dtend=' + encodeURI($scope.endDate);
			microsoftCalendarUrl += '&description=' + encodeURI($scope.description);
			microsoftCalendarUrl += '&location=' + encodeURI($scope.location);

			return microsoftCalendarUrl;
		};

		$scope.calendarUrl = {
			microsoft : getMicrosoftCalendarUrl(),
			google 		: getGoogleCalendarUrl(),
			yahoo 		: getYahooCalendarUrl()
		};
	})
	.directive('addtocalendar', function() {
    return {
      restrict: 'E',
      scope: {
        startDate 	: '@',
        endDate 		: '@',
        title 			: '@',
        description : '@',
        location 		: '@',
        className 	: '@'
      },
    	controller: 'AddtocalendarCtrl',
      template: '\
				<div class="dropdown">\
				  <button ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\
				    Add to Calendar\
				    <span class="caret"></span>\
				  </button>\
				  <ul class="dropdown-menu">\
				    <li><a href="#" ng-click="getIcsCalendarUrl()">iCalendar</a></li>\
				    <li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li>\
				    <li><a href="#" ng-click="getIcsCalendarUrl()">Outlook</a></li>\
				    <li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li>\
				    <li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li>\
				  </ul>\
				</div>\
			'
		};
	});