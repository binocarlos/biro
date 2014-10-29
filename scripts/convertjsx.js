#!/usr/bin/env node
var ls = require('ls-r')
var path = require('path')
var folder = process.argv[2] || path.join(__dirname, '..', 'templates', 'src')

ls(folder, function(err, files){
	console.log('-------------------------------------------');
	console.dir(files)
})
