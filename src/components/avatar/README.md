# Avatar

Avatar to render the user's image, fallbacks to the user's initials.

## Usage

```jsx
import { Avatar } from '@nomios/web-uikit';

<Avatar name="Pedro Santos" />
<Avatar
    name="Pedro Santos"
    image="https://en.gravatar.com/userimage/82191959/d19ac0b9d69bd38f1451cc524b77f290.jpg?size=200" />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| name | string | | The user's name |
| image | string | | The user's image |
| preloadImage | bool | true | Show the user's image only when it's loaded |
| className | string | | A classname to override styles |

Any other properties supplied will be spread to the root element.
