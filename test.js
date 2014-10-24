var angular = require('angular-bsfy')
var biro = require('./')
var tape = require('tape')

var app = angular.module('MyApp',[
    biro.name
])
.controller('MyCtrl', function($scope){
	
})

tape('render a simple form', function(t){
	t.end()
})

