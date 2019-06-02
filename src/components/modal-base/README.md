# Base modal

A low-level modal dialog.

Both `<Modal>` and `<ModalClose>` are low-level components. While you can use them to implement higher-level modals, there are already the following ready-to-use modals:

- [StandardModal](/?path=/story/modal-standardmodal--standalone)
- [FlowModal](/?path=/story/modal-flowmodal--simple)

## Usage

**With a trigger:**

```jsx
import { Modal, ModalClose, ModalTrigger, Button } from '@nomios/web-uikit';
import { Transition } from 'react-transition-group';

const modal = (
    <Modal>
        <Transition timeout={ 300 }>
        { (state) => (
            <div style={ {
                ...{ transition: `opacity 300ms ease-in-out` },
                ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 }
            } }>
             <ModalClose />
             I'm a text in a modal.
            </div>
        ) }
        </Transition>
    </Modal>
);

// Simple usage, triggers when clicking
<ModalTrigger modal={ modal }>
    <Button variant="primary">Click me</Button>
</ModalTrigger>

// Equivalent to the previous one but with a children as a function
<ModalTrigger modal={ modal }>
    { ({ defaultEventProps }) =>
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

<Modal open>I'm a text in a modal.</Modal>
```

### Configuring the app element

Modals will be inserted in `document.body`. You must set the app element to properly hide your application from assistive technologies, such as screenreaders:

```js
import { setAppElement } from '@nomios/web-uikit';

setAppElement('#root');
```

## Modal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| open | boolean | false | Whether the modal is open or not |
| children | element, function | *required* | The children element or render function, see below |
| shouldCloseOnEsc | boolean | false | Whether the modal should close when hitting ESC key or not |
| shouldCloseOnOverlayClick | boolean | false | Whether the modal should close when clicking the overlay or not |
| onRequestClose | boolean | false | Function to be called when there\'s an intent to close the modal |
| onEntered | func | | Function to be called when the modal finishes opening |
| onExited | func | | Function to be called when the modal finishes closing |

Important notes:

- The modal has a `2.5rem` of padding, to avoid its contents to touch the viewport.
- The contents of the modal will be automatically centered both vertically and horizontally.
- The modal will adjust itself based on its contents, preferring to fill the screen. You tweak the contents width to change this behavior.
- The `children` of the modal must be a render function or a `<Transition>` compatible element, see below.

### `children` prop

The modal children may be a render function or a [`<Transition>`](http://reactcommunity.org/react-transition-group) compatible element, with the capability of handling `in`, `onEntered` and `onExited` props.

Here's the usage example, using a render function:

```jsx
const modal = (
    <Modal>
        { ({ in, onEntered, onExited }) => (
            <Transition
                in={ in }
                onEntered={ onEntered }
                onExited={ onExited }
                timeout={ 300 }>
                { (state) => (
                    <div style={ {
                        ...{ transition: `opacity 300ms ease-in-out` },
                        ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 }
                    } }>
                    <ModalClose />
                    I'm a text in a modal.
                    </div>
                ) }
                </Transition>
        ) }
    </Modal>
);

// or just
const modal = (
    <Modal>
        { (props) => (
            <Transition { ...props } timeout={ 300 }>
                { (state) => (
                    <div style={ {
                        ...{ transition: `opacity 300ms ease-in-out` },
                        ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 }
                    } }>
                    <ModalClose />
                    I'm a text in a modal.
                    </div>
                ) }
                </Transition>
        ) }
    </Modal>
);
```

## ModalClose props

All the props will be spreaded into the root element.

Clicking in the `<ModalClose>` component will automatically call `onRequestClose` of the nearest `<Modal>` ancestor. This is done by using the Context API.

## ModalTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| modal | element | *required* | The modal to show |
| children | element, function | *required* | The trigger element or render prop function that should return the trigger element |
| onChange | function | | Function called when the trigger state changes, with a boolean indicating if its open or closed |

If `children` is a react element, event properties such as `onClick` will be added to it.
For advanced cases, `children` may be a render function which is called with:

```js
{
    // Boolean indicating if the open state of the modal
    state,
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
