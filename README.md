biro
====

make angular bootstrap forms from a schema

![pen picture](https://github.com/binocarlos/biro/raw/master/penparts.jpg "pen picture")

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

Biro forms are created from a schema which controls what form fields will be shown for a model.

```js
var angular = require('angular-bsfy')
var biro = require('biro')

var app = angular.module('myApp',[
    biro.name
])

app.controller('MyCtrl', function($scope){

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
	},{
		name:'subscribe',
		type:'checkbox'
	},{
		name:'food',
		type:'select',
		required:true,
		options:['orange', 'apple', {
			title:'Pear',
			value:'pear'
		}]
	},{
		name:'notes',
		type:'textarea'
	}]
	
	$scope.model = {
		color:'red',
		email:'bob@builder.com'
	}

	$scope.click = function(){
		console.dir($scope.model)
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

Render an array of fields into a form.

```js
{
  srcschema:'=schema',
  model:'=',
  readonly:'@',
  static:'@',
  layout:'@'
}
```

`schema` is an array of field definitions (more below).

`model` is an object that is the current data being edited.

`readonly` is a string either `true` or `false` (or any other value than true).

`static` is a string (true or false|other) that will display only values not form fields.

`layout` is a string that is one of `basic`, `horizontal` or `inline`.

#### `biro-field`

Render a single field.

```js
{
  field:'=',
  model:'=',
  readonly:'=',
  static:'='
}
```


#### `schema`

The schema is an array of field definitions where each field is an object with the following fields:

##### `name`

The name of the field from the model.  This can be delimited by dots to access deep nested properties.

##### `title`

The title to display next to the form field.

##### `type`

What data type is the field.  You can either use a biro built-in type or a custom type with a custom template.

The built in types are:

 * text
 * number
 * email
 * select
 * textarea
 * checkbox
 * radio
 * select
 * url
 * date
 * time
 * datetime
 * month
 * week

##### `template`

A string that is used to render the gui for the field.  Use this to render custom field types.

##### `required`

A boolean to indicate there must be a value provided for this field.

##### `validate`

A regular expression string or a function that will validate the value for a field.

##### `encode`

A function that will turn the model value into the value to use for the template.

##### `decode`

A function that will turn the template value into the value to assign to the model.

##### `options`

An array of values to use as options for `radio` and `select` types.

Each value can be a string or an object with `title` and `value` properties.

##### `placeholder`

A string to display when no value is supplied for the field.

##### `description`

A string to display underneath the field to provide help to the user.

## license

MIT