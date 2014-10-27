biro
====

make reactive bootstrap forms from a schema

![pen picture](https://github.com/binocarlos/biro/raw/master/penparts.jpg "pen picture")

## install

Install the module to your project:

```
$ npm install biro --save
```

Include it in your app.js:

```js
var biro = require('biro')

// your app goes here
```

Then compile with [browserify](https://github.com/substack/node-browserify):

```bash
$ browserify > bundle.js
```

## usage

Create a biro form by passing a schema that describes what fields to render and a model for the data:

```js
var biro = require('biro')

var model = {
	color:'red',
	email:'bob@builder.com'
}

// a schema is an array of fields each describing an input to render
var schema = [
	// fields can be strings which are mapped onto the fieldname
	'name',
{
	// the field name is the property of the model
	name:'email',

	// the type describes what type of renderer to use
	type:'email',

	// ensure the user provides a value
	required:true,

	// display this title rather than the name uppercased
	title:'Email Address',

	// display this text below the field
	description:'Some text'
},{
	name:'color',
	type:'radio',

	// for fields that required a list of options (radio, select)
	options:['red', 'green', 'blue'],
	required:true,
	description:'choose a color'
},{
	name:'age',
	type:'number',
	required:true,

	// custom validate function returns true or false
	validate:function()
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

	// options can be strings or objects with a title and value
	options:['orange', 'apple', {
		title:'Pear',
		value:'pear'
	}]
},{
	name:'notes',
	type:'textarea'
}]

var form = biro(document.getElementById('form-div'), schema, model)

function click(){

	var errors = form.errors()

	if(errors.length>0){
		console.log('there are ' + errors.length + ' errors')
	}
	else{
		console.log('the data is:')
		console.dir(form.model())
	}
	
}

// pass a function that is run when the model has been changed
form.change(function(model){
	console.log('form has changed')
	console.dir(model)
})

document.getElementById('click-button').addEventListener(click)
```

Include the biro form in a page:

```html
<!doctype html>
<body>

<div id="form-div"></div>
<button type="button" id="click-button">click</button>

<script src="build.js"></script>
</body>
```

## api

#### `var form = biro(elem, schema, model, opts)`

Render a form with the given schema to a HTML element `elem`.

The model is used as the form data and opts is an object with the following properties:

 * readonly - boolean to render the form with a non-editable interface
 * static - display form values with no inputs
 * layout - string - basic|horizontal|inline - decide what layout to use

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

##### `render`

A function that accepts a state and returns a virtual DOM element for the interface for that field.

## license

MIT