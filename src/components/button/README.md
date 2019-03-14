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
| feedback | string | | Sets the current feedback of the button. Can be one of: `none`, `loading`, `success`, `error` |
| onAnimationEnd | function | | Function called after the `success` or `error` entrance animation finishes. Takes a boolean `isSuccess` as an argument: `true` if the animation occurs after a `success` feedback and `false` otherwise |


**Note:** Any other properties supplied to this component will be spread to the root element.
