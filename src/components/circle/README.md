# Circle

A standard circle component to render text, an icon or an image inside of it.

## Usage

```jsx
import { Circle } from '@nomios/web-uikit';

const imageURL = 'http://foo.bar/myImageURL';

<Circle imageURL={ imageURL } />
```

```jsx
import { Circle } from '@nomios/web-uikit';

<Circle text="AC" />
```

```jsx
import { Circle, UserIcon } from '@nomios/web-uikit';

<Circle icon={ UserIcon } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| imageURL | string | | The image URL to render inside the circle |
| text | string | | The text to render inside the circle |
| icon | element | | An icon to render inside the circle |
| className | string | | A classname to override styles |
