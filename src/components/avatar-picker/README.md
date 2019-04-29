# Avatar Controller

A component to manage avatar uploads.

## Usage

```jsx
import { AvatarPicker } from '@nomios/web-uikit';

const handleOnChange = (image) => console.log('My awesome avatar', image);

<AvatarPicker label="Add photo" text="PS" onChange={ handleOnChange } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| label | string | | Sets the label text |
| icon | element | | An icon to render inside the circle when the name and image are not provided |
| name | string | | The text to render inside the circle. This prop will be spread to `<Avatar>` component |
| imageURL | string | | The image URL to render inside the circle. This prop will be spread to `<Avatar>` component as `image` |
| onChange | function | *required* | A function to be called whenever a new image is loaded. The image will be passed as argument to this function |
| className | string | | A classname to override styles |
