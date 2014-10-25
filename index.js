var angular = require('angular-bsfy')
var stylesheet = require('./stylesheet')
require('./sanitize')

module.exports = angular
	.module('biro', [
    'ngSanitize'
  ])
  .directive('biroForm', require('./form'))
  .directive('biroField', require('./field'))