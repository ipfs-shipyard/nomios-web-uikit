# Modal

A modal dialog.

## Usage

**With a trigger:**

```jsx
import { Modal, ModalTrigger, Button } from '@nomios/web-uikit';

const modal = <Modal>I'm a text in a modal.</Modal>;

// Simple usage, triggers when clicking
<ModalTrigger modal={ modal }>
    <Button variant="primary">Click me</Button>
</ModalTrigger>

// Equivalent to the previous one but with a children as a function
// You may use `isOpen` to highlight the trigger
<ModalTrigger modal={ modal }>
    { ({ isOpen, defaultEventProps }) =>
        <Button variant="primary" { ...defaultEventProps }>Click me</Button> }
</ModalTrigger>

// Custom trigger
<ModalTrigger modal={ modal }>
    { ({ open }) => <Button variant="primary" onMouseEnter={ open }>Hover me</Button> }
</ModalTrigger>
```

**Standalone usage:**

```jsx
import { Modal } from '@nomios/web-uikit';

<Modal isOpen>I'm a text in a modal.</Modal>
```

### Configuring the app element

You must set the app element to properly hide your application from assistive technologies, such as screenreaders:

```js
import { Modal } from '@nomios/web-uikit';

Modal.setAppElement('#root');
```

Moreover, you may define the element in which all the portals will be inserted, which defaults to `document.body`:

```js
import { Modal } from '@nomios/web-uikit';

Modal.setPortalParentElement('#some-modal-container');
```

Note that specifying the `parentSelector` property in the `Modal` component will override this definition.


## ModalTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| modal | element | *required* | The modal to show |
| children | element, function | *required* | The trigger element or render prop function that should return the trigger element |
| onOpen | function | | Function called when the popover opens |
| onClose | function | | Function called when the popover closes |

If `children` is a react element, event properties such as `onClick` will be added to it.
For advanced cases, `children` may be a render function which is called with:

```js
{
    // Boolean indicating if the modal is open
    isOpen,
    // Call this to open the modal, optionally with a delay
    open(delay = 0),
    // Call this to cancel a previously made `cancel` call
    cancelOpen(),
    // Call this to close the modal, optionally with a delay
    close(delay = 0),
     // Call this to toggle between open/close, optionally with a delay
    toggle(delay = 0),
    // Object with all event props that would have been added if the
    // trigger was an element
    defaultEventProps,
}
```

## Modal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| contentClassName | string | | The CSS class to give to the content wrapper element |

Besides the ones listed above, all properties from [react-modal](http://reactcommunity.org/react-modal/#usage) are also supported.

Important notes:

- For accessibility reasons, be sure to define the `contentLabel` property.
- The model has a `max-width` and `max-height` defined to prevent it from touching the viewport, with `2em` of spacing. You may set it by passing a `className` or specifying it via the `style` property.
- The modal contents have no padding by default. You may define it by passing a `className` or specifying it via the `style` property.
