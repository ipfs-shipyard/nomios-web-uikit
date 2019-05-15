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

### Changing the size

You may change the icon size via the `fontSize` CSS property.

```jsx
import { TextButton } from '@nomios/web-uikit';

<TextButton style={ { fontSize: 20 } }>Click me</TextButton>
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| icon | element | | The icon to use |
| iconPosition | string | right | The icon position, can be one of `left`, `right` |
| disabled | boolean | false | Sets the disabled state |

Any other properties supplied will be spread to the root element.
