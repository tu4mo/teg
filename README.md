# teg

*teg* is command-line utility to generate customized template/boilerplate files and folders.

[![Build Status](https://travis-ci.org/tu4mo/teg.svg?branch=master)](https://travis-ci.org/tu4mo/teg)
[![dependencies Status](https://david-dm.org/tu4mo/teg/status.svg)](https://david-dm.org/tu4mo/teg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Installation

Install it once globally:

```sh
npm install -g teg
```

## Usage

```sh
teg <template> <file>
```

## Templates

* A template is just a folder that contains files used to generate new files.
* Place templates in `~/.teg/templates` directory.
* Template's files and folders named `_index(.*)` are automatically renamed to the file specified in the `<file>` parameter.

### Tags

* You can use tags inside templates.
* Currently only supported tag is `{{file}}`.
* The case of the value of a tag can be changed by piping: `{{file|paramCase}}`. Check out [available methods](https://github.com/blakeembrey/change-case).

### Example of a template

A template can contain anything. Here's any example of a template to create React component, with a CSS file.

#### ~/.teg/templates/react-const/\_index.js

```javascript
import React, { Component } from 'react'

const {{file}} = () => (
  <div className="{{file|paramCase}}">

  </div>
)

export default {{file}}
```

#### ~/.teg/templates/react-const/\_index.css

```css
.{{file|paramCase}} {
  display: flex;
}
```

To generate files from this template, run:

```sh
$ teg react-const NewComponent
```

This will generate two new files, `NewComponent.js` and `NewComponent.css`, in the current working directory, replacing `{{file}}` tag with `NewComponent` and `{{file|paramCase}}` with `new-component`.

## TODO

* Custom `{{tags}}` inside templates
* Configuration for tags' formatting
