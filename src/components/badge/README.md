# Badge

A standard badge.

## Usage

```jsx
import { Badge } from '@idm/web-uikit';

<Badge onClick={ handleClick }>
    { children }
<Badge/>
```

## Props

| name                | type     | default    | description                                                                    |
|---------------------|----------|------------|--------------------------------------------------------------------------------|
| selected            | boolean  | false      | Sets the badge as selected                                                     |
| disabled            | boolean  | false      | Sets the disable state                                                         |
| onClick             | function |            | Sets a function to be called when the badge is clicked                         |
| hideOverflow        | boolean  | true       | Sets a maximum width on te component, making the overflowing content hidden    |


**Note:** Any other properties supplied to this component will be spread to the root element.
