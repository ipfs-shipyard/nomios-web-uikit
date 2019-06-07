# Dropdown

A standard dropdown.

## Usage

```jsx
import { Dropdown } from '@nomios/web-uikit';

const options = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'truck', label: 'Truck' },
];

<Dropdown options={ options } />
```

### With custom options

```jsx
import { Dropdown } from '@nomios/web-uikit';

const customOption = ({ defaultClassName, data }) => (
    <div className={ defaultClassName }>My value is: { data.value }</div>
);

const options = [
    { value: 'car', render: customOption },
    { value: 'bike', render: customOption },
    { value: 'truck', render: customOption },
];

<Dropdown options={ options } />
```

### With a custom trigger

```jsx
import { Dropdown, LocationIcon } from '@nomios/web-uikit';

const options = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'truck', label: 'Truck' },
];

const customTrigger = ({ selectedData }) => (
    <div>
        <LocationIcon />
        <span>{ selectedData && selectedData.label }</span>
    </div>
);

const handleChange = (data) => console.log(data);

<Dropdown
    onChange={ handleChange }
    renderTrigger={ customTrigger }
    options={ options } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| options | array | *required* | Array of objects. Check [options notes](#options) to further details on this prop |
| renderTrigger | function || A function to render a custom dropdown trigger. Check [renderTrigger notes](#renderTrigger) to further details |
| onChange | function || A callback to be called whenever an option changes. All the options are passed as argument except for the render property |
| placeholder | string || A placeholder for the trigger |
| menuClassName | string || A className to override menu default styles |
| menuListClassName | string || A className to override menu list default styles |
| optionClassName | string || A className to override option default styles |
| triggerClassName | string || A className to override trigger default styles |
| controlClassName | string || A className to override control default styles |
| arrowPlacement | string | `none` | Defines the placement of the arrow. It can be one of: `left`, `right`, `center` or `none` |

All the props supplied will be spread to [react-select](https://github.com/JedWatson/react-select) component.
You can check other available props [here](https://react-select.com/props).


#### Options

This prop must be an array of objects. Each object must/may have the following properties:
- **value** - The option's value.

	Type: `string`

    Required: `true`

- **label** - The option's label

	Type: `string`

    Required: `false`

	The dropdown will render the value as fallback if this property is not provided.

- **render** - Method to delegate option renderization. If available, it will be the preferred way to render an option.

	Type: `function`

    Required: `false`

	This method will receive an object with the following properties:

	- `isSelected` - Whether the option is selected
		- Type: `boolean`

	- `isDisabled` - Whether the option is disabled
		- Type: `boolean`

	- `isFocused` - Whether the option is focused
		- Type: `boolean`

	- `defaultClassName` - A `classname` with default styles
		- Type: `string`

	- `data` - The data of the selected option except the render property
		- Type: `object`

#### renderTrigger

This method can be useful to render a custom dropdown trigger. This method will receive the following properties:

- **selectedData** - The current selected option data

	Type: `object`

- **placeholder** - The `placeholder` prop

	Type: `string`

- **menuIsOpen** - Whether the menu is open

	Type: `boolean`

- **className** - The `triggerClassName` prop

	Type: `string`
