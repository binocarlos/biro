var angular = require('angular-bsfy')

module.exports = angular
	.module('biro', [
    
  ])

  .directive('biroForm', require('./form'))
  .directive('biroField', require('./field'))
  .filter('ucfirst', require('upper-case-first'))