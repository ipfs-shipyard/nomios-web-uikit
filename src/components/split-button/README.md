# Split Button

A standard split button component.

## Usage

```jsx
import { SplitButton } from '@nomios/web-uikit';

const handleActionClick = (clickedActionId) => console.log('Clicked:', clickedActionId);

const actions = [
    { id: 'backup', icon: <CopyIcon />, text: 'Backup', onClick: handleActionClick },
    { id: 'edit', icon: <EditIcon />, text: 'Edit', onClick: handleActionClick },
    { id: 'delete', icon: <TrashIcon />, text: 'Delete', onClick: handleActionClick, disabled: true },
];

<SplitButton variant="primary" actions={ actions } mainActionId="backup" />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | `primary` | Sets the button variant. Can be one of: `primary` or `negative` |
| actions | string | | An array of actions. Check [actions notes](#actions) to further details on this prop |
| mainActionId | string | | The id of the main action, i.e., the action that is always visible outside the menu |
| onActionClick | function | | A function to be called whenever an action is clicked. It receives the id of the clicked action |

**Note:** Any other properties supplied to this component will be spread to the root element which is the `<Dropdown>` component.


#### Actions

This prop must be an array of objects. Each object must have the following properties:

- **id** - The action's identifier.

	Type: `string`   
    Required: `true`

- **icon** - The action's icon

	Type: `element`

- **text** - The action's button text

    Type: `string`

- **onClick** - The callback to be called when the action is clicked. If this option is set, then `onActionClick` prop will be overwritten by this callback. It also receives the id of the clicked action

    Type: `function`

- **disabled** - The button's disable state

    Type: `boolean`
