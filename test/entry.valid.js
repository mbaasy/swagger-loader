'use strict'

module.exports.dereferenced = require('raw!../index.js!./schemas/valid.yaml')
module.exports.referenced = require('raw!../index.js?dereference=false!./schemas/valid.yaml')
