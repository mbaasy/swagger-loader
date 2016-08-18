'use strict'

var path = require('path')
var webpack = require('webpack')
var MemoryFileSystem = require('memory-fs')
var vm = require('vm')
var assert = require('assert')

var validTest = function () {
  var fs = new MemoryFileSystem()
  var compiler = webpack({
    entry: path.resolve(__dirname, './entry.valid.js'),
    output: {
      path: '/',
      filename: 'result.js'
    }
  })

  compiler.outputFileSystem = fs

  compiler.run(function (err, stats) {
    if (err) { throw err }
    var json = stats.toJson()
    var source = fs.readFileSync('/result.js').toString()
    var script = new vm.Script(source, { filename: 'result.vm' })
    var result = script.runInNewContext({})

    assert.equal(json.warnings.length, 0, 'Expected 0 warnings')
    assert.equal(json.errors.length, 0, 'Expected 0 errors')
    assert.ok(
      /\$ref/.test(result.referenced),
      'Expected referenced to contain $refs'
    )
    assert.ok(
      !/\$ref/.test(result.dereferenced),
      'Expected dereferenced not to contain $refs'
    )
  })
}

var errorTest = function () {
  var fs = new MemoryFileSystem()
  var compiler = webpack({
    entry: path.resolve(__dirname, './entry.invalid.js'),
    output: {
      path: '/',
      filename: 'result.js'
    }
  })

  compiler.outputFileSystem = fs

  compiler.run(function (err, stats) {
    if (err) { throw err }
    var json = stats.toJson()

    assert.equal(json.warnings.length, 0, 'Expected 0 warnings')
    assert.equal(json.errors.length, 1, 'Expected 1 error')
    assert.ok(
      /SyntaxError: Error resolving \$ref pointer "#\/definitions\/Pet"/.test(json.errors[0]),
      'Expected a SyntaxError'
    )
  })
}

validTest()
errorTest()
