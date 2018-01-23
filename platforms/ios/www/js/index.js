
app = angular.module('mangasMe', ['ngRoute']);




app.controller('AboutController', function($scope){
    $scope.aboutContent = function(){
        return "Mangas me! - V.1.0.0";
    };
});


app.directive('mainMenu' , function()
{
    return {
        restrict : 'E',
        templateUrl : 'views/main-menu.html'
    };

});


app.directive('manga' , function()
{
    return {
        restrict : 'E',
        templateUrl : 'views/manga.html',
        controller  : 'HomeController',
        scope: {
          info: "="
        }
    };

});

/*
app.directive('scan' , function()
{
    return {
        restrict : 'E',
        templateUrl : 'views/scan.html',
        controller  : 'HomeController',
        scope: {
          data: "="
        }
    };

});

app.directive('chapter' , function()
{
    return {
        restrict : 'E',
        templateUrl : 'views/chapter.html',
        controller  : 'HomeController',

        scope: {
          data: "="
        }
    };

});
*/




app.config( ['$routeProvider','$httpProvider',
  function($routeProvider,$httpProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }).
      when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      }).
      when('/viewChapters/:manga_id', {
        templateUrl: 'views/chapters-view.html',
        controller: 'HomeController'
      }).
      when('/viewScans/:manga_id/:chapter_number', {
        templateUrl: 'views/scans-view.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
    
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common['X-Requested-With'];
  

  }]) ;












