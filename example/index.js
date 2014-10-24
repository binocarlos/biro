var angular = require('angular-bsfy')
var biro = require('../')

var app = angular.module('biro-example',[
    biro.name
])
.controller('biro-ctrl', function($scope){
	$scope.schema = [{
		name:'name'
	},{
		name:'email',
		type:'email',
		title:'Email Address'
	},{
		name:'color'
	}]

	$scope.model = {
		name:'bob',
		color:'red'
	}
})