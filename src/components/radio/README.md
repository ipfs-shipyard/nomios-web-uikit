# Radio

A standard radio button.

## Usage

```jsx
import { Radio } from '@nomios/web-uikit';

const handleChange = (event) => console.log(event.target.id);

<Radio label="Example" onChange={ handleChange } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| className | string | | A classname to override styles. This classname will be applied to the wrapper element |
| label | string | | Sets the label text |

Any other properties supplied will be spread to the input field.
