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

By default, *teg* looks for templates in `~/.teg/` directory.

### Example of a template

Add this to file `~/.teg/react-class/index.js`

```javascript
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

And this to file `~/.teg/react-class/index.css`

```css
.my-component {
  display: flex;
}
```

To generate templates, run:

```sh
teg react-class NewComponent
```

This will generate two template files, `NewComponent.js` and `NewComponent.css`, in the current working directory.
