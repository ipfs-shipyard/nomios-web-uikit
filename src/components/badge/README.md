# Badge

A standard badge.

## Usage

```jsx
import { Badge } from '@nomios/web-uikit';

<Badge onClick={ handleClick }>hello<Badge/>
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | node | *required* | The contents to render, usually a text |
| selected | boolean | false | Sets the badge as selected |
| disabled | boolean | false | Sets the disable state |
| onClick | function | | Sets a function to be called when the badge is clicked |
| hideOverflow | boolean | true | Sets a maximum width on the component, making the overflowing content hidden |

**Note:** Any other properties supplied to this component will be spread to the root element.
