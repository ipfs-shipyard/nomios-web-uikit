# Confirm Modal

A confirmation standard modal dialog.

## Usage

```jsx
import { ConfirmModal } from '@nomios/web-uikit';

const handleConfirm = () => alert('Confirm');
const handleCancel = () => alert('Cancel');

<ConfirmModal
    title="Are you sure?"
    description="By continuing you accept our terms and conditions."
    onConfirm={ handleConfirm }
    onCancel={ handleCancel }
    open />
```

You may want to use this modal with the `<ModalTrigger>` component. There are a few examples in the [Modal/Base](/?path=/story/modal-base--standalone) page.

## ConfirmModal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| title | string | *required* | The title. Usually a question. |
| description | string | *required* | A description for better understanding before confirmation. |
| onConfirm | function | *required* | Handler to be called on confirm. |
| onCancel | function | *required* | Handler to be called on cancel. |
| open | boolean | false | The visibility state of the confirmation modal. |
| confirmText | string | `Yes` | Confirmation button text |
| confirmVariant | string | `secondary` | Confirmation button variant |
| cancelText | string | `No` | Cancellation button text |
| cancelVariant | string | `primary` | Cancellation button variant |
| className | string | | A custom CSS class to add to the modal container |
| contentClassName | string | | A custom CSS class to add to the content container |
| titleClassName | string | | A custom CSS class to add to the title |
| descriptionClassName | string | | A custom CSS class to add to the description |
| buttonsClassName | string | | A custom CSS class to add to the buttons container |

All the other base [Standard Modal](/?path=/story/modal-standardmodal--standalone) props are supported.
