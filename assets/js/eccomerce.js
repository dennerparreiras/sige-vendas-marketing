(function () {
    'use strict'
        angular.module('SIGE.ecommerce').controller('ECommerceController', function ($scope, $rootScope, $mdDialog, $mdToast, $filter) {
            $scope.addToCart = function (product) {
                $rootScope.saveData('cart', angular.copy(product))
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Item adicionado com sucesso!')
                        .hideDelay(3000)
                )
            }

            $scope.search = function () {
                $scope.filtered = $filter('filter')($scope.products, $scope.searchKeys)
            }

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
                    })
            }

            $rootScope.getProduto('Produto', null, function (params) {
                $scope.products = params
                $scope.search()
            })
            $scope.searchKeys = ''

            $scope.search()

        })

        angular.module('SIGE.ecommerce').controller('CartController', function ($scope, $rootScope, $location, $mdDialog) {
            $scope.cart = $rootScope.getData('cart')
            $scope.totalCard = function () {
                var total = 0
                for (var i in $scope.cart) {
                    total += $scope.cart[i].preco
                }
                return $rootScope.formatNumber(total)
            }

            $scope.removeFromCart = function (id) {
                $rootScope.deleteProductFromCart('cart', id)
                $scope.cart = $rootScope.getData('cart')
            }

            $scope.cancel = function () {
                $mdDialog.hide()
            }

            $scope.showCart = function () {
                return $location.path() == "/ecommerce"
            }

            $scope.toResume = function () {
                $location.path("/resume")
                $mdDialog.cancel()
            }

        })

        angular.module('SIGE.ecommerce').controller('ResumeController', function ($scope, $rootScope, $location, $mdDialog, $http) {
            $scope.purchase = {}
            $scope.cart = $rootScope.getData('cart')

            $scope.totalCard = function () {
                var total = 0
                for (var i in $scope.cart) {
                    total += $scope.cart[i].preco
                }
                return $rootScope.formatNumber(total)
            }

            $scope.purchase = function () {
                console.log($scope.totalCard())
                console.log($scope.purchase.instalments.id);
                if ($scope.clientForm.$valid) {   
                    //fazer o POST
                    $rootScope.post($scope.cart, 
                        $scope.totalCard(), 
                        $scope.purchase.nome, 
                        $scope.purchase.email, 
                        $scope.purchase.instalments.id, 
                        $scope.purchase.paymentType.id, function(params){
                            $location.path("/finish")
                    })
                }
            }

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
                })
            }

            //- 0: credito, 1: debito, 2: boleto, 3: paypal
            $scope.loadPaymentType = function (params) {
                $scope.paymentTypes = [
                    {id: 0, name: "credito"},
                    {id: 1, name: "debito"},
                    {id: 2, name: "boleto"},
                    {id: 3, name: "paypal"},
                ]
            }

            $scope.loadinstalments = function (params) {
                $scope.instalments = [
                    { id: 1, name: "dividido em 1x sem juros"},
                    { id: 2, name: "dividido em 2x sem juros"},
                    { id: 3, name: "dividido em 3x sem juros"},
                    { id: 4, name: "dividido em 4x sem juros"},
                    { id: 5, name: "dividido em 5x sem juros"},
                    { id: 6, name: "dividido em 6x sem juros"}
                ]
            }

        })
})()