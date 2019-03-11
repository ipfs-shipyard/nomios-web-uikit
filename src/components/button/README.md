# Button

A standard button.

## Usage

```jsx
import { Button } from '@nomios/web-uikit';

<Button variant="primary" onClick={ handleClick } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | *required* | Sets the button variant. Can be one of: `primary`, `secondary` `tertiary` or `negative` |
| disabled | boolean | false | Sets the disable state |
| fullWidth | boolean | false | Sets button width to 100% |


**Note:** Any other properties supplied to this component will be spread to the root element.
