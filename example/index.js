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
		required:true,
		description:'This is a test amount of text'
	},{
		name:'age',
		type:'number',
		required:true,
		description:'Type a number'
	},{
		name:'dob',
		type:'date'
	}]

	$scope.model = {
		name:'bob'
	}
})