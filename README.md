biro
====

Form renderer for Redux and React.

![pen picture](https://github.com/binocarlos/biro/raw/master/penparts.jpg "biro form renderer")

## install

Install the module to your project:

```
$ npm install biro --save
```

## usage

There are 2 main concepts in biro:

 * library - a collection of form components that have an opinion about styling
 * schema - a description of the data -> component mapping used to render a form

You define your library as a collection of React components.

The schema lists the fields to render for one form - each field should have at least:

 * name - the field name (required)
 * type - what component to use from the library (default = text)
 
#### reducer

You must install the biro reducer into your redux store:

```javascript
import {createStore, combineReducers} from 'redux'
import formReducer from 'biro/reducer'
const reducers = {
  // ... your other reducers here ...
  biro: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

NOTE - the reducer *must* be under the `biro` property

#### form factory

Before you can render a form in a component - you must create the form class and provide 2 things:

 * the library of components you want to use
 * the name of the form that decides where in state.form the data will live

In this example we are using the standard biro library.

A library is a plain object where the values are React components.

We also have a schema which describes the fields that will appear.

```javascript
import React, { Component, PropTypes } from 'react'
import Biro from 'biro'
import standardLibrary from 'biro/lib/standard'

const FORM_NAME = 'contact'

const SCHEMA = [
	'firstname',   // this is turned into {type:'text',name:'firstname'}
	'surname',
	'email',
	{
		type:'text',
		name:'phone'
	}
]

class MyForm extends Component {
	render() {
		return (
			<div>
				<Biro 
					name={FORM_NAME} 
					initialdata={this.props.data} 
					library={standardLibrary} 
					schema={SCHEMA} />
			</div>
		)
	}
}

export default MyForm
```

This would render the form and update `state.form.contact` with the values.

#### layout components

The following default library components are used to render the layout of the form.

 * row - renders markup around the component itself such as cols, title etc
 * form - renders an array of components

```javascript
import standardLibrary from 'biro/lib/standard'

class MyRowRenderer extends Component {
	render() {
		return (
			<div>
				<span>{this.props.field.title}</span>
				{this.props.children}
			</div>
		)
	}
}

class MyFormRenderer extends Component {
	render() {
		return (
			<div>
				This is a {this.props.title} form
				<hr />
				{this.props.children}
			</div>
		)
	}
}

class MyForm extends Component {
	render() {
		return (
			<div>
				<Biro 
					name={FORM_NAME} 
					initialdata={this.props.data} 
					library={standardLibrary} 
					schema={SCHEMA}
					rowrenderer={MyRowRenderer}
					formrenderer={MyFormRenderer} />
			</div>
		)
	}
}

export default MyForm
```

#### API

A full list of the properties you can use:

 * name - control where in the state the data is written
 * library - the name to Component map of the field renderers
 * schema - the list of the fields to render (must have 'name' and 'type')
 * initialdata - the existing data to initiate the form with
 * formrenderer - the component to use to render the whole form
 * rowrenderer - the component to use to render a row
 
#### library components

A library component is a React component with the following key properties:

 * value - the current form value to display
 * error - the current error from validation
 * schema - the schema entry for this field
 * update - a function to run when the user changes the value

It is responsible for renderering the GUI for the form field - not the title of other wrapping markup.

```javascript
import React, { Component, PropTypes } from 'react'

class MyElement extends Component {

	handleChange(e) {
		this.props.update(e.target.value)
	}
	render() {
		return (
			<input type="text" onChange={this.handleChange} value={this.props.value} />
		)
	}
}

export default MyElement
```

You map components into a library to use for a form - here is an example of us creating a custom library using `MyElement`:

```javascript
import standardLibrary from 'biro/lib/standard'
import MyElement from './library/myelement'

var customLibrary = Object.assign({}, standardLibrary, {
	myelement:MyElement
})
```

#### schema

The fields each field should have in the schema:

 * name - what field of the data object to write the value to
 * type - what library component to use to render the field (default to 'text')
 * title - what to display next to the field (default to name)
 * validate - a function to validate the user entry

The schema entry can have any other fields also - for example a select list would need some options.

The schema data is accessible from the React component using `this.props.schema`.

The validate function has the following signature and returns a falsy value for success or a string indicating the error:

```javascript
function(value, dirty){
	if(!value || value.indexOf('*')<0){
		return 'must contain an asterix'
	}
	else {
		return false
	}
}
```

#### state

The state object written to `state.form.XXXX` takes the following shape:

```javascript
{
	data:{
		name:'bob',
		email:'bob@bob.com',
		address:null
	},
	meta:{
		name:{
			dirty:true,
			error:false
		},
		email:{
			dirty:false,
			error:false
		},
		address:{
			dirty:true,
			error:'cannot be blank'
		}
	}
}
```

This lets you use the `.data` property for POSTing to an API and to analyse the `.fields` property for errors.

## license

MIT