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

```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Biro from 'biro'
import tools from 'biro/tools'
import standardLibrary from 'biro/library/standard'

import { updatForm, submitForm } from '../actions/contactform'

const SCHEMA = [
	'firstname',   // this is turned into {type:'text',name:'firstname'}
	'surname',
	'email',
	{
		type:'text',
		name:'phone'
	}
]

export class ContactForm extends Component {
  render() {
    return (
      <div>
        <div>
          Contact Details
        </div>
        <div>
          <Biro 
          	data={this.props.data}
          	schema={SCHEMA}
          	library={standardLibrary}
          	meta={this.props.meta}
            validate={this.props.validate.bind(this)}
          	update={this.props.update} />
        </div>
        <div>
          <Button onClick={this.submitForm.bind(this)}>
            Submit Details
          </Button>
        </div>
      </div>
    )
  }

  validateForm(data) {
    var ret = {}
    if(data.firstname==data.surname){
      ret.firstname = 'Your surname and firstname are the same?'
    }
    return ret
  }

  submitForm() {
    if(this.props.meta.valid){
      return this.props.submit(this.props.data)
    }

    // this means the form is invalid - force all fields to
    // be dirty so the errors display
    this.props.update(this.props.data, tools.forceDirty(this.props.meta))
  }
}

function mapStateToProps(state, ownProps) {
  return {
  	data:state.contactform.data,
  	meta:state.contactform.meta || {}
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update:function(data, meta){
      dispatch(updatForm(data, meta))
    },
    submit:function(data){
      dispatch(submitForm(data, meta))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm)
```



#### properties

A full list of the properties you can use:

 * data - the current form data
 * meta - the current form meta
 * library - an object of form library components
 * layout - an object of form layout components
 * schema - the list of the fields to render
 * validate - an overall validation function that can work with all form data
 * update - a function to call when the form state changes
 * rawschema - do not apply the pre-processor to the schema
 * getContext - a function that is passed into each field component

#### update

The state management of form data is up to you.  Biro expects an `update` property that is a function that is run whenever the state of the form has changed.

This function will receive 2 arguments - data and meta.  These 2 arguments should be stashed somewhere in your reducer and fed back into the biro form.

Here is an example of the state object once our reducer has stashed the data and meta for a form - in this example the `data` and `meta` properties are exactly what is received from biro:

```javascript
{
	data:{
		name:'bob',
		email:'bob@bob.com',
		address:null
	},
	meta:{
		valid:false,
    dirty:true,
    fields:{
      name:{
        dirty:true,
        valid:true
      },
      email:{
        dirty:false,
        valid:true
      },
      address:{
        dirty:true,
        valid:false,
        error:'cannot be blank'
      }
    }

	}
}
```

When the update function is run - you should emit an action with the data and meta properties.  Then - in the component that renders the form you should feed these values back as the `data` and `meta` props of the biro component.

#### schema

The schema is an array of objects describing each field in the form - each object has these properties:

 * name - what field of the data object to write the value to
 * type - what library component to use to render the field (default to 'text')
 * title - what to display next to the field (default to name)
 * validate - a function to validate the value

The schema entry can have any other fields also - for example a select list would need some options.

The validate function has the following signature and returns a string for an error or any other type of value for `ok`.

```javascript
function(value){
	if(!value || value.indexOf('*')<0){
		return 'must contain an asterix'
	}
	else {
		return false
	}
}
```

#### library

A library element is a React component with the following properties:

 * title - the title of the field
 * value - the current form value to display
 * error - the current error to display
 * schema - the schema entry for this field
 * update - a function to run when the user changes the value
 * blur - a function to run when the user blurs focus (this will trigger validation)

It is responsible for renderering the GUI for the form field alone - not the title or other markup.

```javascript
import React, { Component, PropTypes } from 'react'

class MyElement extends Component {

	handleChange(e) {
		this.props.update(e.target.value)
	}

	handleBlur(e) {
		this.props.blur()
	}

	render() {
		return (
			<input type="text" onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} value={this.props.value} />
		)
	}
}

export default MyElement
```

#### layout components

The layout components control the wrapping markup for the form elements.

There are the following types of layout component - these should be properties of the `layout` object passed to the form:

 * row - renders markup around the component itself such as cols, title etc
 * form - renders an array of components

```javascript
import standardLibrary from 'biro/library/standard'

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

const layout = {
	row:MyRowRenderer,
	form:MyFormRenderer
}

class MyForm extends Component {
	render() {
		return (
			<div>
				<Biro 
					data={this.props.data}
					meta={this.props.meta}
					library={standardLibrary} 
					schema={SCHEMA}
					layout={layout}
					update={update} />
			</div>
		)
	}
}

export default MyForm
```

#### initialize form

By providing a null `meta` property you are resetting the form state - do this to assign a new set of data to the form.

When biro notices a null `meta` property it will immediately call the `update` function with the meta filled in with the current validation status.

#### validate form

Errors are displayed for form fields if the `error` property and the `dirty` property of the meta for that field are set.

When you initially assign data to a form (by passing a null meta prop) - all of the fields will have `dirty=false` even though some may have errors.

Biro validates continously and so at any given moment the validation state of the form can be calculated using the meta property.

The `dirty` property must be true for a form error to display - this means if a user clicks submit before entering any information we would want to not submit and instead display the errors.

You can use the `biro/tools` library to do this (as in the example at the top of the page).

The `validate` property of the form is a function that accepts an object (the data entered into the form) and returns an object with a property for each of the errors.

```javascript
function(data, meta){
  var ret = {}
  if(data.password!=data.password2 && meta.password.dirty && meta.password2.dirty){
    ret.password = 'passwords must match'
  }
  return ret
}
```

#### schema pre-processors

By mapping the schema you give to a form and injecting various validation functions, you can create lots of various input types quickly:

```javascript
function validateEmail(val){
  return val.indexOf('@')>0 ? null : 'invalid email address'
}

var schema = [{
  name:'name'
},{
  name:'email',
  type:'email'
}]

schema = schema.map(field => {
  if(field.type=='email'){
    field.validate = validateEmail
    field.type = 'text'
  }
  return field
})
```

There are some built-in schema processors that will apply commonly useful features (unless you set the `rawschema` property):

 * required - setting `required=true` in the schema will apply a required validation

## license

MIT