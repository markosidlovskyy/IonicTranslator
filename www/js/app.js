// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("Translator", function($scope, $http){
    $scope.languages=[];
    $scope.languagesID=[];
    $scope.formData = {};
    
    
    $scope.text={
    valueIn:'',
        valueOut:'',
        valueDetected:''
};
   
    $http({
        method: 'GET',
        url: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
        params: {
            key: 'trnsl.1.1.20160718T181149Z.de06773acd6fd8a3.0a61b93a7b91ebf6242eca13afeb847ee99f1351',
            ui: 'en'
        }
    }).success(function(data){
        
        angular.forEach(data.langs,function (key,value){
            $scope.languagesID.push(value);
     $scope.languages.push(key);
});
        $scope.formData.inputSelect=$scope.languages[0];
        $scope.formData.outputSelect=$scope.languages[1];
    
    }).error(function(response){
        console.log(response);
    })
    
    $scope.inSelectValue=function(value){
        if($scope.formData.outputSelect==value){
       count=$scope.languages.length;
        index=$scope.languages.indexOf(value);
        if(index!=0)
            $scope.formData.outputSelect=$scope.languages[index-1];
            else
                $scope.formData.outputSelect=$scope.languages[index+1];
        }
         $scope.formData.inputSelect=value;
    }
    
     $scope.outSelectValue=function(value){
         if($scope.formData.inputSelect==value){
       count=$scope.languages.length;
        index=$scope.languages.indexOf(value);
        if(index!=0)
            $scope.formData.inputSelect=$scope.languages[index-1];
            else
                $scope.formData.inputSelect=$scope.languages[index+1];
        }         
        $scope.formData.outputSelect=value;
    }
    
    $scope.translate=function(){
        
        inID = $scope.languagesID[$scope.languages.indexOf($scope.formData.inputSelect)];
        outID = $scope.languagesID[$scope.languages.indexOf($scope.formData.outputSelect)];
       $http({
        method: 'GET',
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        params: {
            key: 'trnsl.1.1.20160718T181149Z.de06773acd6fd8a3.0a61b93a7b91ebf6242eca13afeb847ee99f1351',
            text: $scope.text.valueIn,
            lang: inID+'-'+outID            
        }
    }).success(function(data){
        
       $scope.text.valueOut=data.text[0];
    
    }).error(function(response){
            console.log(response);
    })
    }
    
    $scope.detected=function(){
         $http({
        method: 'GET',
        url: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
        params: {
            key: 'trnsl.1.1.20160718T181149Z.de06773acd6fd8a3.0a61b93a7b91ebf6242eca13afeb847ee99f1351',
            text: $scope.text.valueIn,         
        }
    }).success(function(data){
        
       $scope.formData.inputSelect=$scope.languages[$scope.languagesID.indexOf(data.lang)];
    
    }).error(function(response){
              console.log(response);
    })
    }
    
    
});
