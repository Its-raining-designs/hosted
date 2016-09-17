(function () {
    angular.module('OnePushApp.portfolios.services',[])
           .factory('PortfoliosService', PortfoliosService);

    PortfoliosService.$inject = ["$timeout", "$q", "$http", "$timeout", "appConstants"];

    function PortfoliosService($timeout, $q, $http, $timeout, appConstants) {


        var PortfoliosService = {
            fetchPortfolios: fetchPortfolios,
            pushPortfolio: pushPortfolio
        };

        return PortfoliosService;

        function fetchPortfolios(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.OnePushBaseURL,
                headers: {},
                params: {
                    type: 'json',
                    query: 'list_websites'
                }
            }
            $http(req).then(function (response) {
                def.resolve({
                    portfolios: response.data.websites
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function pushPortfolio(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.OnePushBaseURL,
                headers: {},
                params: {
                    type:'json',
                    query:'push',
                    title: params.title,
                    url: params.url,
                    tag: params.tag
                }
            }
            $http(req).then(function (response) {
                def.resolve({
                    portfolio: response.data
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

    }
})();