# teg

*teg* is command-line utility to generate template files.

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

Templates are just folders that contain the files used to generate new files. By default, *teg* looks for templates in `~/.teg/` directory. Files named with `index.*` are automatically renamed.

### Example of a template

```javascript
/* ~/.teg/react-class/index.js */

import React, { Component } from 'react'

class MyComponent extends Component {
  render () {
    return (
      <div className="my-component">

      </div>
    )
  }
}

export default MyComponent
```

```css
/* ~/.teg/react-class/index.css */

.my-component {
  display: flex;
}
```

To generate templates, run:

```sh
teg react-class NewComponent
```

This will generate two template files, `NewComponent.js` and `NewComponent.css`, in the current working directory.

## TODO

* `{{variables}}` inside templates
* Templates with folders
