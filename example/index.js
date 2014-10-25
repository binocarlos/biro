var angular = require('angular-bsfy')
var biro = require('../')

var app = angular.module('biro-example',[
    biro.name
])
.controller('biro-ctrl', function($scope){
	$scope.schema = [
		'name',
	{
		name:'email',
		type:'email',
		required:true,
		title:'Email Address',
		description:'Some text'
	},{
		name:'color',
		type:'radio',
		options:['red', 'green', 'blue'],
		required:true,
		description:'choose a color'
	},{
		name:'age',
		type:'number',
		required:true,
		description:'Type a number'
	},{
		name:'dob',
		type:'month'
	},{
		name:'url',
		type:'url'
	}]

	$scope.model = {
		name:'bob',
		color:'red'
	}

	$scope.showmodel = function(){
		console.dir($scope.model)
	}
})