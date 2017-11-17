(function() {
  'use strict';
  angular.module('SIGE', [
      'SIGE.routes',
      'SIGE.service',
      'SIGE.home',
      'SIGE.sideNav',
      'SIGE.login',
      'SIGE.users',
      'SIGE.ecommerce',
      'SIGE.clients',
      'SIGE.products',
      'SIGE.news',
      'SIGE.opportunities'
    ]);
    
  angular.module('SIGE.routes', ['ngRoute', 'ngMaterial']);
  angular.module('SIGE.home', []);
  angular.module('SIGE.sideNav', []);
  angular.module('SIGE.login', []);
  angular.module('SIGE.users', []);
  angular.module('SIGE.service', []);
  angular.module('SIGE.ecommerce', []);
  angular.module('SIGE.clients', []);
  angular.module('SIGE.products', []);
  angular.module('SIGE.news', []);
  angular.module('SIGE.opportunities', ['ngMaterial']);

  angular.module('SIGE').controller('AppCtrl', function($scope, $location, $timeout, $mdSidenav, $log) {
      $scope.isSpecificPage = function() {
          return $location.path() == '/login'
          return true;
      };

      $scope.openSideNav = function() {
          $mdSidenav('left').toggle();
      };


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

  angular.module('SIGE.home').controller('HomeController', function($scope) { });

  angular.module('SIGE.news').controller('NewsController', function($scope) { });

  angular.module('SIGE.opportunities').controller('OpportunitiesController', function($scope, $http, $mdToast) {
    $scope.candidato = {};
    
    $scope.Send = function() {
        $http({
            method: 'POST',
            url: '/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                NomeCandidato: $scope.candidato.NomeCandidato, 
                EmailCandidato: $scope.candidato.EmailCandidato,
                VagaCandidato: $scope.candidato.VagaCandidato,
                PretensaoCandidato: $scope.candidato.PretensaoCandidato
            }
        })
        .then(function () {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Executado!')
                  .hideDelay(3000)
              );
        });
      }

  });
  
  angular.module('SIGE.sideNav').controller('NavCtrl', function($scope, $timeout, $mdSidenav, $log) {
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
  
  angular.module('SIGE.sideNav').controller('SideNavCtrl', function($scope, $location, $mdSidenav) {
      $scope.toPage = function(page) {
        $location.path( "/" + page );
        $mdSidenav('left').close();
      };

      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };

      $scope.items = [
        { name: 'Home', icon: 'assets/icons/svg/home.svg', page: 'home'},
        { name: 'Veja nossos produtos', icon: 'assets/icons/svg/store.svg', page: 'ecommerce'},
        { name: 'Novidades SIGE', icon: 'assets/icons/svg/marketing.svg', page: 'news'},
        { name: 'Oportunidades', icon: 'assets/icons/svg/handshake.svg', page: 'opportunities'},
      ];

  });

  angular.module('SIGE.login').controller('LoginController', function($scope, $location) {
      $scope.doLogin = function() {
          $location.path( "/home" );
      };
  });

  angular.module('SIGE.users').controller('UsersController', function($scope, $rootScope, $location) {
      $scope.toHome = function() {
          $location.path( "/home" );
      };

      $scope.new = function() {
          $location.path( "/user/new" );
      };

      $scope.edit = function(id) {
          $location.path( "/user/" + id );
      };

      $scope.delete = function(id) {
          $scope.user = $rootScope.deleteData('users', id);
          $scope.users = $rootScope.getData('users');
      };

      $scope.users = $rootScope.getData('users');
  });

  angular.module('SIGE.users').controller('UserController', function($scope, $rootScope, $location, $routeParams) {
      
      if($routeParams.id) {
          scope.user = $rootScope.getData('users', $routeParams.id);
          $scope.user._birth = new Date($scope.user.birth);
      }
      
      $scope.save = function() {
          $scope.user.birth = $rootScope.formatServerDate($scope.user._birth);
          $rootScope.saveData('users', $scope.user);
          $location.path( "/users" );
      };

  });

  angular.module('SIGE.ecommerce').controller('ECommerceController', function ($scope, $rootScope, $mdDialog, $mdToast, $filter) {
      $scope.addToCart = function (product) {
          product.id = undefined;
          $rootScope.saveData('cart', angular.copy(product));
          $mdToast.show(
              $mdToast.simple()
                  .textContent('Item adicionado com sucesso!')
                  .hideDelay(3000)
          );
      };

      $scope.search = function () {
          $scope.filtered = $filter('filter')($scope.products, $scope.searchKeys);
      };

      $scope.openCart = function (ev) {
          $mdDialog.show({
              controller: 'CartController',
              templateUrl: 'assets/templates/ecommerce/cart.modal.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
          })
              .then(function (answer) {

              }, function () {
              });
      };

      $scope.products = $rootScope.getData('products');
      $scope.searchKeys = '';

      $scope.search();

  });

  angular.module('SIGE.ecommerce').controller('CartController', function($scope, $rootScope) {
      $scope.cart = $rootScope.getData('cart');

      $scope.totalCard = function() {
          var total = 0;
          for(var i in $scope.cart) {
              total += $scope.cart[i].price;
          }
          return $rootScope.formatNumber(total);
      };

      $scope.removeFromCart = function(id) {
          $rootScope.deleteData('cart', id);
          $scope.cart = $rootScope.getData('cart');
      };

      $scope.close = function() {
          console.log('Fechar');
      };

  });

  angular.module('SIGE.clients').controller('ClientsController', function($scope, $rootScope, $location) {
      $scope.toHome = function() {
          $location.path( "/home" );
      };

      $scope.new = function() {
          console.log('New client');
          $location.path( "/client/new" );
      };

      $scope.edit = function(id) {
          $location.path( "/client/" + id );
      };

      $scope.delete = function(id) {
          $scope.clients = $rootScope.deleteData('clients', id);
          $scope.clients = $rootScope.getData('clients');
      };

      $scope.clients = $rootScope.getData('clients');
  });

  angular.module('SIGE.clients').controller('ClientController', function($scope, $rootScope, $location, $routeParams) {
      
      if($routeParams.id) {
          $scope.client = $rootScope.getData('clients', $routeParams.id);
          $scope.client._birth = new Date($scope.client.birth);
      }
      
      $scope.save = function() {
          $scope.client.birth = $rootScope.formatServerDate($scope.client._birth);
          $rootScope.saveData('clients', $scope.client);
          $location.path( "/clients" );
      };

  });

  angular.module('SIGE.products').controller('ProductsController', function($scope, $rootScope, $location) {
      $scope.toHome = function() {
          $location.path( "/home" );
      };

      $scope.new = function() {
          $location.path( "/product/new" );
      };

      $scope.edit = function(id) {
          $location.path( "/product/" + id );
      };

      $scope.delete = function(id) {
          $rootScope.deleteData('products', id);
          $scope.products = $rootScope.getData('products');
      };

      $scope.products = $rootScope.getData('products');
  });

  angular.module('SIGE.products').controller('ProductController', function($scope, $rootScope, $location, $routeParams) {
      
      if($routeParams.id) {
          $scope.product = $rootScope.getData('products', $routeParams.id);
      }
      
      $scope.save = function() {
          $rootScope.saveData('products', $scope.product);
          $location.path( "/products" );
      };

  });

})();