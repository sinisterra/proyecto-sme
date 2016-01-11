(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('StatsController', StatsController);



	/* @ngInject */
	function StatsController($scope,$state,$timeout, Auth, Restangular,toastr, _) {
		var vm = this;
		vm.selectedPregunta = null;
		vm.preguntasData = null;
		vm.getColor = getColor;
		vm.getStats = getStats;
		vm.selectedEdadGraph  = 'actual';
		vm.selectedEdadOffset = null;

		vm.drawEdades = drawEdades;
		vm.entidadesFederativas = null;

		vm.selectedEntidadFederativa = null;
		vm.selectedCampoExperiencia=null;
		vm.selectedAreaDeExperiencia=null;
		vm.selectedExperienciaEspecifica=null;

		vm.camposExperiencia = null;
		vm.areasDeExperiencia= null;
		vm.experienciasEspecificas=null;
		vm.getAreaDeExperiencia = getAreaDeExperiencia;
		vm.getExperienciasEspecificas = getExperienciasEspecificas;


		vm.resetCampoExperiencia  = resetCampoExperiencia;
		vm.resetAreaExperiencia  = resetAreaExperiencia;
		vm.resetExperienciaEspecifica  = resetExperienciaEspecifica;
		vm.resetEntidadFederativa = resetEntidadFederativa;

		vm.combinedSearch = combinedSearch;


		vm.educacionGraphOptions = [{label:'Proyeccion',value:'proyeccion'},{label:'Actual',value:'actual'}];

		vm.colors = ['#F44336', '#FFC107', '#3F51B5', '#00BCD4', '#CDDC39','#FF7043'];

		vm.chartOptions = {
			tooltipTemplate:" <%=label%>: <%= numeral(value).format('(00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>"
		}


		activate();




		////////////////

		function checkAuth() {
			return localStorage.type === 'Admin';
		}

		function activate() {

			if (checkAuth()) {
				getCamposExperiencia();
				getEntidadesFederativas();
				getPreguntas();
				getRegisters();
				getCountSexo();
				drawPlots();
			}
			else{
				$state.go('dashboard');
			}

		}

		function drawPlots() {
			drawEdades();
			drawUbicacion();
			drawEducacion();
		}


		function resetEntidadFederativa() {
			vm.selectedEntidadFederativa = null
		}

			function resetCampoExperiencia()
		{
			vm.selectedCampoExperiencia=null;
			vm.selectedAreaDeExperiencia=null;
			vm.selectedExperienciaEspecifica=null;

		}

		function resetAreaExperiencia()
		{
			vm.selectedAreaDeExperiencia=null;
			vm.selectedExperienciaEspecifica=null;
		}

		function resetExperienciaEspecifica()
		{
			vm.selectedExperienciaEspecifica=null;
		}

		function combinedSearch()
		{
			var request = {};
			if(vm.selectedEntidadFederativa!=null)
			{
				request.Combined ='true';
				request.idEntidadFederativa = vm.selectedEntidadFederativa;


					if(vm.selectedAreaDeExperiencia!=null)
					{
						request.Specificity = 'area';
						request.id = vm.selectedAreaDeExperiencia;

					}
					else
					{
						request.Specificity = 'campo';
						request.id =  vm.selectedCampoExperiencia;
					}


			}
			else
			{
				request.combined ='false';
				if(vm.selectedAreaDeExperiencia!=null)
				{
					request.Specificity = 'area';
					request.id = vm.selectedAreaDeExperiencia;

				}
				else
				{
					request.Specificity = 'campo';
					request.id =  vm.selectedCampoExperiencia;
				}
			}
			Restangular.all('Estadisticas').all('Combinado').customPOST(request).then(function(res){
				vm.combinedData =res;
				console.log(vm.combinedData);
			}).catch(function(err){
				vm.combinedData =null;
			});

		}


		function getEntidadesFederativas(){
			Restangular.all('Pais').one('EntidadFederativa',1).customGET().then(function(res){
				vm.entidadesFederativas = res;
			}).catch(function(err)
			{

			})
		}


		function getCamposExperiencia()
		{
			Restangular.all('CampoDeExperiencia').all('Simple').customGET().then(function(res){
				vm.camposExperiencia = res;
			}).catch(function(err){
				;
			})
		}


		function getAreaDeExperiencia()
		{
			Restangular.all('CampoDeExperiencia').one('Areas',vm.selectedCampoExperiencia).customGET().then(function(res)
			{
				vm.selectedExperienciaEspecifica=null;
				vm.areasDeExperiencia = res;
			}).catch(function(err)
			{

			});
		}

		function getExperienciasEspecificas()
		{
			Restangular.all('AreaDeExperiencia').one('Especifico',vm.selectedAreaDeExperiencia).customGET().then(function(res)
			{
				vm.experienciasEspecificas = res;
			}).catch(function(err)
			{

			});

		}


		function getPreguntas()
		{
			Restangular.all('Pregunta').customGET().then(function(res){
				vm.Preguntas = res;
			}).catch(function(err)
			{
				;
			})
		}

		function getStats()
		{
			Restangular.one('Pregunta',vm.selectedPregunta.id).customGET().then(function(res){
				vm.preguntasData = null;
				$timeout(function(){
					vm.preguntasData = res;
				})

			}).catch(function(err){
				toastr.error("Error al generar la gráfica","Datos no encontrados");
				vm.preguntasData=null;
			})
		}

		function getRegisters()
		{
			Restangular.all('Estadisticas').all('Registros').customGET().then(function(res)
			{
				vm.Users = res;
			}).catch(function(err){
				;
			})
		}


		function getCountSexo()
		{
			Restangular.all('Estadisticas').all('Sexo').customGET().then(function(res){
				vm.sexoData = res;
			}).
				catch(function(err){

				})
		}



		function getColor(i) {
			var color = i % 7,
				colorMap = ['#F44336', '#FFC107', '#3F51B5', '#00BCD4', '#CDDC39','#FF7043','#E040FB'];

			return colorMap[color];
		}

		function drawEdades() {

			var request =
			{
				Ranges: [{
				"minRange": "20",
				"maxRange": "30"
			}, {
				"minRange": "31",
				"maxRange": "40"
			}, {
				"minRange": "41",
				"maxRange": "50"
			}, {
				"minRange": "51",
				"maxRange": "60"
			}, {
				"minRange": "61",
				"maxRange": "100"
			}]};
			if(vm.selectedEdadGraph == 'proyeccion')
			{
				request.Offset = vm.selectedEdadOffset;
				Restangular.all('Estadisticas').all('Proyeccion').customPOST(request)
					.then(function(res) {
						var ctx = $('#edades').get(0).getContext('2d');

						vm.edadesData = res.data;
						vm.edadesLabels = res.labels;

						var chartData = _.map(res.data, function(d, i) {
							return {
								'value': d,
								'label': res.labels[i],
								'color': getColor(i)
							};
						});


							new Chart(ctx).Pie(chartData,vm.chartOptions);
					})
					.catch(function(res) {
						;
					});
			}
			else{
				Restangular.all('Estadisticas').all('Edades').customPOST(request.Ranges)
					.then(function(res) {
						var ctx = $('#edades').get(0).getContext('2d');

						vm.edadesData = res.data;
						vm.edadesLabels = res.labels;

						var chartData = _.map(res.data, function(d, i) {
							return {
								'value': d,
								'label': res.labels[i],
								'color': getColor(i)
							};
						});
						new Chart(ctx).Pie(chartData,vm.chartOptions);
					})
					.catch(function(res) {
						;
					});
			}


		}

		function drawUbicacion() {
			Restangular.all('Estadisticas').all('Ubicacion').customGET()
				.then(function(res) {
					var ctx = $('#ubicacion').get(0).getContext('2d');
					vm.ubicacionData = res.data;
					vm.ubicacionLabels = res.labels;

					var chartData = _.map(res.data, function(d, i) {
						return {
							'value': d,
							'label': res.labels[i],
							'color': getColor(i)
						};
					});

					new Chart(ctx).Pie(chartData,vm.chartOptions);
				})
				.catch(function(res) {
					
				})
		}


		function drawEducacion() {
			Restangular.all('Estadisticas').all('Educacion').customGET()
				.then(function(res) {
					var ctx = $('#educacion').get(0).getContext('2d');

					vm.educacionData = res.data;
					vm.educacionLabels = res.labels;

					var chartData = _.map(res.data, function(d, i) {
						return {
							'value': d,
							'label': res.labels[i],
							'color': getColor(i)
						};
					});

					new Chart(ctx).Pie(chartData,vm.chartOptions);
				})
				.catch(function(res) {
					
				});
		}

	}
})();
