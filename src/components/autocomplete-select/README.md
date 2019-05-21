# Auto-complete Select

A select control (dropdown) with auto-complete functionality. This is a wrapper component for [react-select](https://github.com/JedWatson/react-select).

## Usage

```jsx
import { AutocompleteSelect } from '@nomios/web-uikit';

const myOptions = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'truck', label: 'Truck' },
];

<AutocompleteSelect options={ myOptions } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| value | string | *required* | The selected value |
| onChange | function | *required* | A callback to be called whenever an option changes. Only the `value` is passed as argument to the callback |
| options | array | *required* | Array of objects. Option object example: `{ value: 'car', label: 'Car' }` |

All the properties supplied will be spread to [react-select](https://github.com/JedWatson/react-select) component.
You can check all the available props [here](https://react-select.com/props).

**Note**: `classNamePrefix` prop cannot be changed as we are using it to style the input.
