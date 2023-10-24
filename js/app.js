angular.module('canalapp', ['ckServices', 'ngRoute', 'ngAnimate'])
	.config(function($routeProvider, $locationProvider, $rootScopeProvider) {
		$routeProvider.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapCtrl'
		});
		$routeProvider.when('/moreInfo/:formId/:itemId', {
			templateUrl: 'views/moreInfo.html',
			controller: 'MoreInfoCtrl'
		});
		$routeProvider.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'About'
		});
		$routeProvider.otherwise({
			redirectTo: '/map'
		});
		$rootScopeProvider.digestTtl(30);
	})
	.run(['$location', '$rootScope', 'ckConsole', function($location, $rootScope, ckConsole) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if(current.$$route){
				switch(current.$$route.controller){
				case 'MapCtrl':
					document.title = "Venice Canals Map";
					break;
				case 'MoreInfoCtrl':
					ckConsole.getData(current.params.itemId).then(function(item){
						document.title = "More Info";
					});
					break;
				case 'About':
					console.log("Si, sei in about sembra");
				default:
					document.title = "Venice Canals";
					break;
				}
			}
		});
	}]);