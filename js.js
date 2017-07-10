var a = angular.module('app',[]);
var config = {  
headers: {
        "X-Api-Key": "5b06d48ffce44fc89f9c629d43b88af2"
    }
};

a.service("newsServ",function($http){
    this.news = {};
    this.sources = [];
    this.getArticles = function(source,sorting){
 return $http.get("https://newsapi.org/v1/articles?source="+source+"&sortBy="+sorting+"&apiKey=26a63d0675f04d459b2214eaf8808f3c"); // or ,config
        
        
    }

    
    this.getSources = function(category){
         return $http.get("https://newsapi.org/v1/sources?language=en&category="+category+"&apiKey=26a63d0675f04d459b2214eaf8808f3c"); // or ,config
    }
    
    
    
});

a.controller('ctrl',function($scope ,newsServ){
    
    $scope.categories = [ 'business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];      //I putted this manually since this is the only thing not provided by API.
    $scope.selectedSource='bbc-news';
    $scope.sortingType='top';
        $scope.category='general';
    //$scope.url = 'http://www.bbc.co.uk/news/uk-politics-39020252';
    $scope.getArticles = function(){
        
        $('.card').html('<img style="width:100%; hight:100%" src="loading.gif">'); //loading image while getting
        
    newsServ.getArticles($scope.selectedSource,$scope.sortingType,$scope.category).then(function(response) {
        
        $scope.news = response.data;
        newsServ.news = $scope.news;
        
        
    });
    
    }
    

    
    $scope.getSources = function(){
        $('.sources').html('<img style="width:100%; hight:100%" src="loading.gif">');
        newsServ.getSources($scope.category).then(function(response) {
        $scope.sources = response.data.sources;
            
        newsServ.sources = $scope.sources;
            //$scope.send();
        
        
    });
        
    }
    
    $scope.getSelectedSource = function(i){
        
        $scope.selectedSource = i;
        $scope.getArticles();
        
        
    }
    
    
});