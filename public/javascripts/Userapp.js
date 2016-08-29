'use strict';
/**
 * @ngdoc function
 * @name tango.controller:UserCtrl
 * @description
 * # UserCtrl
 * User Controller of the TangoConf app
 */
 angular.module('tango').factory('Users', function($http){
   return {
    //as28tuge
   fetchAllUsers: function(){
      return $http.get('/getAllUsers');
      },
   
   searchById : function(id) {
      return $http.get('/api/users/'+id);
    },
  updateUserdata : function(id,userdata){
     return $http.put('/updateuserdata/' +id,userdata);
  },
  
  deleteuser : function(id){
    return $http.delete('/deleteuser/'+id);
  }
  

  }
  
  });
  
  


  // angular.module('tango',[])

  angular.module('tango').controller('UsersCtrl', ['$scope','$state','Users','auth',function($scope,$state,Users,auth){
  
  $scope.formData = {};
  $scope.userdata = {};

        // when landing on the page, get all todos and show them
      Users.searchById(auth.currentUserid()).success(function(data) {
                        $scope.users = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                }); 
        
        
  $scope.updateUserdata = function(id) {
      Users.updateUserdata(auth.currentUserid(),$scope.userdata).error(function(error) {
                      $scope.error = error;
                 }).then(function(){
            $state.go('home');
        });
        };
    
  $scope.deleteuser = function(id) {
      Users.deleteuser(auth.currentUserid()).success(function() {
                                $state.go('login');
                        })
                       
        };
  

}]);