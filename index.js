var angular = require('angular-bsfy')
var stylesheet = require('./stylesheet')

module.exports = angular
	.module('biro', [
    
  ])
  .directive('biroForm', require('./form'))
  .directive('biroField', require('./field'))