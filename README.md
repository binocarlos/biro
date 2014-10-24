biro
====

angular bootstrap forms - make a bootstrap form from a schema

## install

Install the module to your project:

```
$ npm install biro --save
```

Include it in your app.js:

```js
var angular = require('angular-bsfy')
var biro = require('biro')

var app = angular.module('myApp',[
    biro.name
])
```

Then compile with [browserify](https://github.com/substack/node-browserify) and [brfs](https://github.com/substack/brfs):

```bash
$ browserify -t brfs app.js > bundle.js
```

## usage

Biro forms are created from a `schema` which controls what form fields will be shown for a model:

```js
var angular = require('angular-bsfy')
var biro = require('biro')

var app = angular.module('myApp',[
    biro.name
])

app.controller('MyCtrl', function($scope){

	$scope.schema = [{
		name:'color'
	},{
		title:'Use this title',
		type:'email',
		name:'email'
	}]

	$scope.model = {
		color:'red',
		email:'bob@builder.com'
	}

	$scope.click = function(){
		alert($scope.model.color)
	}
	
})
```

Include the biro form in a page:

```html
<body ng-app="MyApp" ng-controller="MyCtrl">

<div>
	<biro-form schema="schema" modle="model" />
	<button type="button" ng-click="click()">click</button>
</div>

<script src="build.js"></script>
</body>
```

## directives

#### `biro-form`

 * =schema - an array of field definitions
 * =model - an object containing the current model data

#### `biro-field`

 * =model - an object containing the current model data
 * =field - the name of the model field
 * @type - the field type

## license

MIT