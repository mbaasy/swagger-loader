# swagger-loader for Webpack

[![Build Status](https://travis-ci.org/mbaasy/swagger-loader.svg?branch=master)](https://travis-ci.org/mbaasy/swagger-loader) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

```javascript

import 'file?name=swagger.json!swagger?dereference=false!./swagger.yml'
// => Exports swagger.json with all internal references ($ref) intact.
// Uses file-loader

import schema from 'json!swagger!../swagger.yml'
// => Exports swagger schema as a JS object.
// Uses json-loader

```

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Query options

`dereference=false`: Keep internal references intact. Useful for reducing the file size of an exported `swagger.json` file.

## Config options

`override`: Override your specification. Useful for setting environment specific values.

Example:

```javascript
// webpack.config.js
module.exports({
  entry: '...',
  swaggerLoader: {
    overrides: {
      host: process.env.NODE_ENV === 'production' ? 'api.example.com' : 'localhost:3000',
    }
  }
})
```

## Report an Issue

* [Bugs](https://github.com/mbaasy/swagger-loader/issues)
* Contact the author: [hello@mbaasy.com](hello@mbaasy.com)

## MIT License

> Copyright (c) 2016 [mbaasy.com](https://mbaasy.com/)

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
