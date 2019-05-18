# Radio

A standard radio button.

## Usage

```jsx
import { Radio } from '@nomios/web-uikit';

const handleChange = (event) => console.log(event.target.value);

<Radio name="example" label="Bar" value="bar" onChange={ handleChange } />
<Radio name="example" label="Foo" value="foo" onChange={ handleChange } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| label | string | | Sets the label text |

**Note:** Any props related to the input, such as `value`, `name` and `onChange`, will be spread to the underlying input element. All the other props will be spread into the root element.
