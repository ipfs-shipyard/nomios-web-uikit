# Button

A standard button.

## Usage

```jsx
import { Button } from '@nomios/web-uikit';

<Button variant="primary" onClick={ handleClick } />
```

### As an anchor

```jsx
import { Button } from '@nomios/web-uikit';

<Button
    element={ <a href="http://google.com" rel="noopener noreferrer" target="_blank" /> }
    variant="primary" />
```

If a custom `element` prop is passed, the `aria-disabled` and `z-index` attributes will be set accordingly.

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | *required* | Sets the button variant. Can be one of: `primary`, `secondary` `tertiary` or `negative` |
| disabled | boolean | false | Sets the disable state |
| fullWidth | boolean | false | Sets button width to 100% |
| feedback | string | | Sets the current feedback of the button. Can be one of: `none`, `loading`, `success`, `error` |
| element | element | `<button />` | The element to use, useful to render a anchor instead of a button |

**Note:** Any other properties supplied to this component will be spread to the root element.
