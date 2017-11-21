(function () {
    'use strict';

    angular.module('SIGE').run(function ($rootScope, $http) {
        /* var products = [{
            id: 1,
            name: 'Batata Rufles',
            price: 22.30,
        }, 
        {
            id: 2,
            name: 'hipoglos',
            price: 12.90,
        }, 
        {
            id: 3,
            name: 'Bandaid',
            price: 99.99,
        }]; */
        
        var service = {
            cart: []
        }

        $rootScope.getProduto = function (data, id, done) {
            var url = data;
            if (id) {
                url += "/" + id;
            }
            $http.get("http://pickingapi.azurewebsites.net/api/" + url)
                .then(response => {
                    done(response.data);
                });
        };

        $rootScope.getData = function (data, id) {
            if (!id) {
                return service[data];
            }

            for (var i in service[data]) {
                if (service[data][i].id == id) {
                    return service[data][i];
                }
            }
        };

        $rootScope.deleteProductFromCart = function (data, id){
            for (var i in service[data]) {
                if (service[data][i].idProduto == id) {
                    return service[data].splice(i, 1);
                }
            }
        };

        $rootScope.deleteData = function (data, id) {
            if (!id) {
                return;
            }
            for (var i in service[data]) {
                if (service[data][i].id == id) {
                    return service[data].splice(i, 1);
                }
            }
        };

        $rootScope.saveData = function (data, object) {
            if (!object.id) {
                object.id = service[data].length + 1;
                return service[data].push(object);
            }

            for (var i in service[data]) {
                if (service[data][i].id == object.id) {
                    service[data][i] = object;
                    return;
                }
            }
        }

        $rootScope.formatNumber = function (number, decimalsLength, decimalSeparator, thousandSeparator) {
            var n = number,
                decimalsLength = isNaN(decimalsLength = Math.abs(decimalsLength)) ? 2 : decimalsLength,
                decimalSeparator = decimalSeparator == undefined ? "," : decimalSeparator,
                thousandSeparator = thousandSeparator == undefined ? "." : thousandSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decimalsLength)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;

            return sign +
                (j ? i.substr(0, j) + thousandSeparator : "") +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandSeparator) +
                (decimalsLength ? decimalSeparator + Math.abs(n - i).toFixed(decimalsLength).slice(2) : "");
        };

        $rootScope.formatServerDate = function (date, format) {
            if (!(date == undefined)) {
                if (format == 'dd/mm/yyyy') {
                    return $rootScope.pad(date.getDate()) + "/" + $rootScope.pad((date.getMonth() + 1)) + "/" + date.getFullYear();
                }
                return date.getFullYear() + "-" + $rootScope.pad((date.getMonth() + 1)) + "-" + $rootScope.pad(date.getDate());
            }
        };

        $rootScope.pad = function (n, width, z) {
            if (width == undefined) {
                width = 2;
            }
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };

    })
})();