(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('StatsController', StatsController);



	/* @ngInject */
	function StatsController($state, Auth, Restangular,_) {
		var vm = this;
		vm.getColor = getColor;

		activate();

		////////////////

		function checkAuth() {
			return true;
		}

		function activate() {

			if (checkAuth()) {
				drawPlots();
			}

		}

		function drawPlots() {
			drawEdades();
			drawUbicacion();
		}

		function getColor(i) {
			var color = i % 5,
				colorMap = ['#F44336', '#FFC107', '#3F51B5', '#00BCD4', '#CDDC39'];
			return colorMap[color];
		}

		function drawEdades() {
			Restangular.all('Estadisticas').all('Edades').customPOST([{
					"minRange": "18",
					"maxRange": "25"
				}, {
					"minRange": "25",
					"maxRange": "35"
				}, {
					"minRange": "35",
					"maxRange": "45"
				}, {
					"minRange": "45",
					"maxRange": "100"
				}])
				.then(function(res) {
					var ctx = $('#edades').get(0).getContext('2d');

					vm.edadesLabels = res.labels;

					var chartData = _.map(res.data, function(d, i) {
						return {
							'value': d,
							'label': res.labels[i],
							'color': getColor(i)
						};
					});

					new Chart(ctx).Pie(chartData);
				})
				.catch(function(res) {
					debugger;
				});
		}

		function drawUbicacion(){
			Restangular.all('Estadisticas').all('Ubicacion').customGET()
			.then(function(res){
				var ctx = $('#ubicacion').get(0).getContext('2d');

				vm.ubicacionLabels = res.labels;

				var chartData = _.map(res.data, function(d, i) {
					return {
						'value': d,
						'label': res.labels[i],
						'color': getColor(i)
					};
				});

				new Chart(ctx).Pie(chartData);
			})
			.catch(function(res){debugger})
		}

	}
})();
