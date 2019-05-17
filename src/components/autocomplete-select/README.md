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

All the properties supplied will be spread to [react-select](https://github.com/JedWatson/react-select) component.
You can check all the available props [here](https://react-select.com/props).

**Note**: `classNamePrefix` prop cannot be changed as we are using it to style the input.
