# Standard Modal

The standard modal dialog.

## Usage

```jsx
import { StandardModal } from '@nomios/web-uikit';

<StandardModal open>I'm a text in a modal.</Modal>
```

You may want to use this modal with the `<ModalTrigger>` component. There are a few examples in the [Modal/Base](/?path=/story/modal-base--standalone) page.

## StandardModal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | node | | The step contents |
| showClose | bool | | Wether to show the close button or not |
| contentClassName | string | | A custom CSS class to add to the content container |

All the other base [Modal](/?path=/story/modal-base--standalone) props are supported.