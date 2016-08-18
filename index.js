'use strict'

var SwaggerParser = require('swagger-parser')
var loaderUtils = require('loader-utils')

module.exports = function (content) {
  var callback = this.async()
  var query = loaderUtils.parseQuery(this.query)
  this.cacheable && this.cacheable()
  this.addContextDependency(this.context)
  var overrides = this.options.swaggerLoader &&
                  typeof this.options.swaggerLoader.overrides === 'object' &&
                  this.options.swaggerLoader.overrides || {}

  SwaggerParser.dereference(this.resourcePath,
    {$refs: {internal: false}},
    function (err, api) {
      if (err) { return callback(err) }
      Object.assign(api, overrides)
      // SwaggerParser.validate has an unintented side effect where api is
      // mutated. result is set to a JSON string beforehand to pass it off
      // to the callback.
      var result = query.dereference === false && JSON.stringify(api)
      SwaggerParser.validate(api, function (err) {
        if (err) { return callback(err) }
        if (result) { return callback(null, result) }
        return callback(null, JSON.stringify(api))
      })
    })
}

module.exports.raw = true
