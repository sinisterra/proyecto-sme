 (function() {
 	'use strict';

 	angular
 		.module('appSme')
 		.filter('titleCase', titleCase);

 	function titleCase() {
 		return titleCaseFilter;

 		////////////////

 		function titleCaseFilter(input) {
 			input = input || '';
 			return input.replace(/\w\S*/g, function(txt) {
 				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
 			});
 		}
 	}

 })();
