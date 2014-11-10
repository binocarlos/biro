var biro = require('../')

var schema = [
	'fullname',
{
	property:'email',
	type:'email',
	required:true,
	title:'Email Address',
	description:'Some text'
},{
	property:'color',
	type:'radio',
	options:['red', 'green', 'blue'],
	required:true,
	description:'choose a color'
},{
	property:'age',
	type:'number',
	required:true,
	description:'Type a number'
},{
	property:'dob',
	type:'month'
},{
	property:'url',
	type:'url'
},{
	property:'subscribe',
	type:'checkbox'
},{
	property:'food',
	type:'select',
	required:true,
	options:['orange', 'apple', {
		title:'Pear',
		value:'pear'
	}]
},{
	property:'notes',
	type:'textarea'
}]

var model = {
	fullname:'bob',
	color:'red',
	food:'apple',
	subscribe:true,
	notes:'This is some notes\n\n\n\non some lines'
}

var form = biro({
	layout:'basic',
	schema:schema
})

form.setData(model)

function showModel(){
	console.dir(form.getData())
}

form.render(document.getElementById('form-render'))

document.getElementById('form-log').addEventListener('click', showModel)
