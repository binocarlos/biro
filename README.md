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
 
#### redux-form

You must install the biro reducer into your redux store:

```javascript
import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'biro'
const reducers = {
  // ... your other reducers here ...
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

#### form factory

Before you can render a form in a component - you must create the form class and provide 2 things:

 * the library of components you want to use
 * the name of the form that decides where in state.form the data will live

```javascript
import React, { Component, PropTypes } from 'react'
import Biro from 'biro'
import standardLibrary from 'biro/lib/standard'

const FORM_NAME = 'contact'
```

In this example we are using the standard biro library.  A library is a plain object where the values are React components.

#### schema

Now that we have a React component - we can render it using a schema:

```javascript
const schema = [
	'firstname',   // this is turned into {type:'text',name:'firstname'}
	'surname',
	'email',
	{
		type:'text',
		name:'phone'
	}
]
```

#### render form

```javascript
class MyForm extends Component {
	render() {
		return (
			<div>
				<Biro name={FORM_NAME} library={standardLibrary} schema={schema} />
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

By including your own library items you can control the form and row rendering of the form.

```javascript
import standardLibrary from 'biro/lib/standard'

const customLayoutLibrary = Object.assign({}, standardLibrary, {
	customRow:function(props){
		return (
			<div>
				<span>{props.field.title}</span>
				{props.children}
			</div>
		)
	}
})

class MyForm extends Component {
	render() {
		return (
			<div>
				<Biro name={FORM_NAME} library={customLayoutLibrary} schema={schema} rowrenderer="customRow" />
			</div>
		)
	}
}

export default MyForm
```

You can also use specific rowRenders for a single field:


```javascript
const schema = [
	{
		type:'text',
		name:'phone',
		rowrenderer:'customRow'
	}
]
```

#### library components

A library component is a React component with the following key properties:

 * value
 * error
 * field
 * update

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

#### default components

The following components are supplied by default if missing from the library:

 * text

## license

MIT