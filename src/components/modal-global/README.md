# Global modal

A global modal react provider. You can open and close modals imperatively (i.e. separately from the Component `render` function).

## Usage

**With `withModalGlobal()` hook:**

```jsx
import { ModalGlobalProvider, withModalGlobal, Modal, ModalClose, Button } from '../src';
import { Transition } from 'react-transition-group';

const FadeModal = ({ children, ...rest }) => (
    <Modal { ...rest }>
        <Transition timeout={ 300 }>
            { (state) => (
                <div style={ {
                    ...{ padding: '5rem', transition: 'opacity 300ms ease-in-out' },
                    ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 },
                } }>
                    <ModalClose />
                    I'm a text in a modal.
                </div>
            ) }
        </Transition>
    </Modal>
);

const WrappedComponent = withModalGlobal(({ globalModal: { openModal } }) => (
    <Button onClick={ () => openModal(<FadeModal />) }>
        Open Modal Imperatively
    </Button>
));

<ModalGlobalProvider>
    <OtherComponent />
    <ParentComponent>
        <MyComponent />
    </ParentComponent>
</ModalGlobalProvider>
```

**With `<ModalGlobalConsumer>` component:**

```jsx
import { ModalGlobalProvider, ModalGlobalConsumer, Modal, ModalClose, Button } from '../src';

const FadeModal = ({ children, ...rest }) => (
    <Modal { ...rest }>
        <Transition timeout={ 300 }>
            { (state) => (
                <div style={ {
                    ...{ padding: '5rem', transition: 'opacity 300ms ease-in-out' },
                    ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 },
                } }>
                    <ModalClose />
                    I'm a text in a modal.
                </div>
            ) }
        </Transition>
    </Modal>
);

const MyComponent = () => {
    return (
        <ModalGlobalConsumer>
            { ({ openModal }) => (
                <Button onClick={ () => openModal(<FadeModal />) }>
                    Open Modal Imperatively
                </Button>
            ) }
        </ModalGlobalConsumer>
    )
};

<ModalGlobalProvider>
    <OtherComponent />
    <ParentComponent>
        <MyComponent />
    </ParentComponent>
</ModalGlobalProvider>
```

## API

### ModalGlobalProvider

This component uses [react context api](https://reactjs.org/docs/context.html) and it will provide two functions to its consumers:

- `closeModal(component)`   
This function receives the modal component to be closed.

- `openModal(component)`   
This function receives the modal component to be opened.

**Note:** You must instantiate the provider up higher in your react tree.

### ModalGlobalConsumer

The `<ModalGlobalConsumer>` component allows you to trigger a modal imperatively by providing a children render prop with two props:

- `closeModal(component)`

- `openModal(component)`

### withModalGlobal(component)

The hook version of the <ModalGlobalConsumer> component. The injected props are exactly the same of the <ModalGlobalConsumer> children render prop:

- `closeModal(component)`

- `openModal(component)`
