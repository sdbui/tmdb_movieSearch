/**
 * Created by Steven on 6/2/2014.
 */
var API_KEY = "{tmdb api key}";

var dbApp = angular.module('dbApp',[]);

dbApp.controller('dbCtrl',function($scope,$http){
    $scope.hasContent = true;
    $scope.searchName = '';
    $scope.movieList;




    $scope.search = function(evt){
        if(evt.keyCode ==13){
            getData($scope.searchName);
        }
    };

    function getData(str){
        $scope.movieCache = $scope.movieCache || {};
        if($scope.movieCache[str]){
            console.log('grabbing from cache...');
            $scope.movieList = $scope.movieCache[str].sort(function(a,b){
                    var dateA = new Date(a['release_date']);
                    var dateB = new Date(b['release_date']);
                    return dateB - dateA;
            });
        } else {
            var encode = encodeURIComponent(str);
            $http.get('https://api.themoviedb.org/3/search/person?api_key='+ API_KEY+'&query='+encode)
                .success(function(result){
                    var person_id = result['results'][0].id;
                    $http.get("https://api.themoviedb.org/3/person/"+person_id+"/movie_credits?api_key="+ API_KEY)
                        .success(function(result){
                            console.log('making ajax call...');
                            $scope.movieCache[str] = result.cast;
                            $scope.movieList = $scope.movieCache[str].sort(function(a,b){
                                var dateA = new Date(a['release_date']);
                                var dateB = new Date(b['release_date']);
                                return dateB - dateA;
                            });

                        });
                });
        }

    };



});