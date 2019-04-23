# Icon

A SVG icon with support for sprites via dynamic imports.

## Usage

**Using a specific icon from the icon set:**

```jsx
import { CloseIcon, ReplyIcon } from '@nomios/web-uikit';

<WarningIcon />
<InfoIcon />
```

Please check the "Icon/All icons" under Storybook for the list of available icons.

**Using manually:**

```jsx
import { Icon } from '@nomios/web-uikit';
import mySvg from './path/to/my.svg';

<Icon svg={ mySvg } />
```

### Changing the color

By default, `fill` inherits from the current `color`.

Neverthless, you may change the color via the `fill` CSS property.
Additionally, you may tweak the opacity via the `fill-opacity` CSS property.

```jsx
import { WarningIcon } from '@nomios/web-uikit';

<WarningIcon style={ { fill: 'yellow' } } />

```
### Changing the size

You may change the icon size via the `fontSize` CSS property (defaults to `2.4rem`).

```jsx
import { ReplyIcon } from '@nomios/web-uikit';

<ReplyIcon style={ { fontSize: '1.6rem' } } />
```

Alternatively you may change the `width` and `height` CSS properties.

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| svg | string, object | | The svg contents or the object exported by [external-svg-sprite-loader](https://github.com/Karify/external-svg-sprite-loader) |

Any other properties supplied will be spread to the root element.
