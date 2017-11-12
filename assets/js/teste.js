
var app = angular.module('SIGE', [
    'ngRoute',
    'ngMaterial',
    'ngMessages'
]);

app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {templateUrl: "assets/templates/home.html", controller: "AppCtrl", authorize: true})
        .when("/oportunidades", {templateUrl: "assets/templates/interest_form.html", controller: "InterestCtrl", authorize: true})
        .when('/404', {templateUrl: "assets/templates/404.html", authorize: true})
        .otherwise("/404");
});

app.config(function($mdThemingProvider) {
    
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
          'default': '200', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '500', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
        })
    
        .accentPalette('red', {
          'default': '600',
          'hue-1': '100'
        });
    
});

/*
 * Controllers
 */
app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log){

});

app.controller('InterestCtrl', function ($scope, $timeout, $mdSidenav, $log){

  $scope.project = {
    description: 'Nuclear Missile Defense System',
    rate: 500,
    special: true
  };

});

app.controller('NavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug(navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
});

app.controller('LeftNavCtrl', function ($scope, $timeout, $mdSidenav, $log, $mdDialog) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };

    $scope.items = [
        { name: 'Veja nossos produtos', extraScreen: 'Compras menu', icon: 'assets/icons/svg/store.svg', link: '#'},
        { name: 'Novidades SIGE', extraScreen: 'News menu', icon: 'assets/icons/svg/marketing.svg', link: '#'},
        { name: 'Oportunidades', extraScreen: 'Oportunidades menu', icon: 'assets/icons/svg/handshake.svg', link: '#'},
    ];
    
    $scope.navigateTo = function(to, event) {
        $mdDialog.show(
            $mdDialog.alert()
            .title('Navigating')
            .textContent('Imagine being taken to ' + to)
            .ariaLabel('Navigation demo')
            .ok('Neat!')
            .targetEvent(event)
        );
    };
});