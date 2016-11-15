[![Build Status](https://travis-ci.org/tu4mo/teg.svg?branch=master)](https://travis-ci.org/tu4mo/teg)

# teg

*teg* is command-line utility to generate template / boilerplate files.

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

A template is just a folder that contains files used to generate new files. By default, *teg* looks for templates in `~/.teg/` directory. Template files named with `index.*` are automatically renamed to the file specified in the <file> parameter.

### Example of a template for React component with CSS

#### ~/.teg/react-class/index.js

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

#### ~/.teg/react-class/index.css

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
* Templates with folders
* Ability to use literally index.* named templates
* Automatically install default templates to `~/.teg`
* Configuration for tags' formatting
