var app = angular.module("myApp", []);


app.controller("MiControlador", function ($scope, $http) {
   //vamos a hacer uso de $http para obtener los datos
   $http.get('datos.json').success(function (response) {
   //enviamos los datos a la vista con el objeto $scope
   $scope.datos = response.collection.items;

       
 });
});
