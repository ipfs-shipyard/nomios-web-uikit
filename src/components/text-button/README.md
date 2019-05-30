# TextButton

A text based button.

## Usage

```jsx
import { TextButton } from '@nomios/web-uikit';

<TextButton onClick={ handleClick }>Click me</TextButton>
```

### With an icon

```jsx
import { TextButton, EditIcon } from '@nomios/web-uikit';

<TextButton icon={ <EditIcon /> } onClick={ handleClick }>Click me</TextButton>
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | `large` | The variant of the button, can be one of: `small` or `large` |
| icon | element | | The icon to use |
| iconPosition | string | right | The icon position, can be one of `left`, `right` |
| disabled | boolean | false | Sets the disabled state |

Any other properties supplied will be spread to the root element.
