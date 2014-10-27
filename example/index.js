var biro = require('../')

var schema = [
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

var model = {
	name:'bob',
	color:'red',
	food:'apple',
	subscribe:true,
	notes:'This is some notes\n\n\n\non some lines'
}

var form = biro({
	schema:schema,
	model:model
})

function showModel(){
	console.dir(form.model())
}