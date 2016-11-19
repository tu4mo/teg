[![Build Status](https://travis-ci.org/tu4mo/teg.svg?branch=master)](https://travis-ci.org/tu4mo/teg)

# teg

*teg* is command-line utility to generate customized template/boilerplate files and folders.

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
* Template's files and folders named `_index(.*)` are automatically renamed to the file specified in the <file> parameter.

### Example of a template

A template can contain anything. Here's any example of a template to create React component classes, with a CSS file.

#### ~/.teg/templates/react-class/\_index.js

```javascript
import React, { Component } from 'react'

class {{file}} extends Component {
  render () {
    return (
      <div className="{{file}}">

      </div>
    )
  }
}

export default {{file}}
```

#### ~/.teg/templates/react-class/\_index.css

```css
.{{file}} {
  display: flex;
}
```

To generate files from this template, run:

```sh
teg react-class NewComponent
```

This will generate two new files, `NewComponent.js` and `NewComponent.css`, in the current working directory, replacing `{{file}}` tag with `NewComponent`.

## TODO

* Custom `{{tags}}` inside templates
* Piping for variables (lowercase, camelcase, etc.)
* Automatically install default templates to `~/.teg/templates`
* Configuration for tags' formatting
