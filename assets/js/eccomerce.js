(function () {
    'use strict';
        angular.module('SIGE.ecommerce').controller('ECommerceController', function ($scope, $rootScope, $mdDialog, $mdToast, $filter) {
            $scope.addToCart = function (product) {
                /* product.idProduto = undefined; */
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

            $rootScope.getProduto('Produto', null, function (params) {
                $scope.products = params;
                $scope.search();
            });
            $scope.searchKeys = '';

            $scope.search();

        });

        angular.module('SIGE.ecommerce').controller('CartController', function ($scope, $rootScope, $location, $mdDialog) {
            $scope.cart = $rootScope.getData('cart');
            $scope.totalCard = function () {
                var total = 0;
                for (var i in $scope.cart) {
                    total += $scope.cart[i].preco;
                }
                return $rootScope.formatNumber(total);
            };

            $scope.removeFromCart = function (id) {
                $rootScope.deleteProductFromCart('cart', id);
                $scope.cart = $rootScope.getData('cart');
            };

            $scope.cancel = function () {
                $mdDialog.hide();
            };

            $scope.showCart = function () {
                return $location.path() == "/ecommerce";
            };

            $scope.toResume = function () {
                $location.path("/resume");
                $mdDialog.cancel();
            }

        });

        angular.module('SIGE.ecommerce').controller('ResumeController', function ($scope, $rootScope, $location, $mdDialog) {
            $scope.purchase = {};
            $scope.cart = $rootScope.getData('cart');

            $scope.totalCard = function () {
                var total = 0;
                for (var i in $scope.cart) {
                    total += $scope.cart[i].preco;
                }
                return $rootScope.formatNumber(total);
            };

            $scope.purchase = function () {
                if ($scope.clientForm.$valid) {   
                    $location.path("/finish");
                }
            };

            $scope.openCart = function (ev) {
                $mdDialog.show({
                    controller: 'CartController',
                    templateUrl: 'pages/ecommerce/cart.modal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            $scope.loadParcelas = function (params) {
                $scope.instalments = [
                    { id: 1, name: "1x sem juros"},
                    { id: 2, name: "2x sem juros"},
                    { id: 3, name: "3x sem juros"},
                    { id: 4, name: "4x com juros"},
                    { id: 5, name: "5x com juros"},
                    { id: 6, name: "6x com juros"}
                ]
            };

            /* scope.loadParcelas = function () {
                   /*  $scope.users = $scope.users || [
                        { id: 1, name: 'Scooby Doo' },
                        { id: 2, name: 'Shaggy Rodgers' },
                        { id: 3, name: 'Fred Jones' },
                        { id: 4, name: 'Daphne Blake' },
                        { id: 5, name: 'Velma Dinkley' }
                    ]; 
            }; */

        });
})();