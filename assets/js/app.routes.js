(function() {
	'use strict';

	angular
		.module('SIGE.routes')
		.config(RoutesConfig);

	RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

	function RoutesConfig($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/home', {
				templateUrl: 'assets/templates/home.html',
				controller: 'HomeController',
				controllerAs: 'HomeController',
			})
			// .when('/login', {
			// 	templateUrl: 'assets/templates/login.html',
			// 	controller: 'LoginController',
			// 	controllerAs: 'LoginController',
			// })
			// .when('/users', {
			// 	templateUrl: 'assets/templates/users.html',
			// 	controller: 'UsersController',
			// 	controllerAs: 'UsersController',
			// })
			.when('/ecommerce', {
				templateUrl: 'assets/templates/ecommerce.html',
				controller: 'ECommerceController',
				controllerAs: 'ECommerceController',
			})
			.when('/products', {
				templateUrl: 'assets/templates/products.html',
				controller: 'ProductsController',
				controllerAs: 'ProductsController',
			})
			// .when('/product/new', {
			// 	templateUrl: 'assets/templates/product.html',
			// 	controller: 'ProductController',
			// 	controllerAs: 'ProductController',
			// })
			.when('/product/:id', {
				templateUrl: 'assets/templates/product.html',
				controller: 'ProductController',
				controllerAs: 'ProductController',
      })
			.when('/news', {
				templateUrl: 'assets/templates/news.html',
				controller: 'NewsController',
				controllerAs: 'NewsController',
      })
			.when('/opportunities', {
				templateUrl: 'assets/templates/opportunities.html',
				controller: 'OpportunitiesController',
				controllerAs: 'OpportunitiesController',
			})
			.otherwise({redirectTo: '/home'});
	}
}());