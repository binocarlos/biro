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
		required:true,
		title:'Email Address'
	},{
		name:'color',
		required:true,
		description:'This is a test amount of text'
	}]

	$scope.model = {
		name:'bob'
	}
})