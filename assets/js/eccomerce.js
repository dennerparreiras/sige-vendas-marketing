(function () {
    'use strict';
        angular.module('SIGE.ecommerce').controller('ECommerceController', function ($scope, $rootScope, $mdDialog, $mdToast, $filter) {
            $scope.addToCart = function (product) {
                product.idProduto = undefined;
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
                $rootScope.deleteData('cart', id);
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
                $location.path("/finish");
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

        });
})();