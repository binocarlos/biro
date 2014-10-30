#!/usr/bin/env node
var ls = require('ls-r')
var fs = require('fs')
var path = require('path')
var cp = require('child_process')
var mkdirp = require('mkdirp')
var srcFolder = path.join(__dirname, '..', 'templates', 'src')
var targetFolder = path.join(__dirname, '..', 'templates', 'build')

function convertFile(file, target, done){
	var dirname = path.dirname(target)
	mkdirp(dirname, function(){
		var out = fs.createWriteStream(target)
		var proc = cp.spawn('mercury-jsx', [
			file
		], {
			stdio:['ignore', out, 'inherit']
		})
		proc.on('error', done)
		proc.on('done', done)	
	})
}

ls(srcFolder, function(err, files){

	files = files.filter(function(file){
		return file.match(/\.jsx$/)
	})
	
	function nextFile(){
		if(files.length<=0){
			console.log('done')
			process.exit()
		}

		var file = files.shift()
		var target = file.replace(srcFolder, targetFolder)
		target = target.replace(/\.jsx/, '.js')

		console.log(file + ' -> ' + target)
		process.exit()
		convertFile(file, nextFile)
	}

	nextFile()
})
