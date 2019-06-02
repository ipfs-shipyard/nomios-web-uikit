# FlowModal

The flow modal dialog.

## Usage

The `<FlowModal>` component should be used along with `<FlowModalStep>`.

```jsx
import { FlowModal, FlowModalStep } from '@nomios/web-uikit';

<FlowModal open variant="simple" step="first">
    <FlowModalStep id="first">
        This is the first step.
        <button onClick={ handleGoToSecondStep }>Next step</button>
    </FlowModalStep>
    <FlowModalStep id="second">
        This is the second step.
        <button onClick={ handleFinish }>Done</button>
    </FlowModalStep>
</FlowModal>
```

There are four different layouts for the modal: half, half-bordered, wide, full. The layout applied depends on the chosen variant. The following diagrams demonstrate how layouts are applied:

- **simple**

    ![simple](/src/components/modals/flow-modal/diagrams/simple.png)

- **simple-with-feedback**

    ![simple-with-feedback](/src/components/modals/flow-modal/diagrams/simple-with-feedback.png)

- **advanced**

    ![advanced](/src/components/modals/flow-modal/diagrams/advanced.png)

You may want to use this modal with the `<ModalTrigger>` component. There are a few examples in the [Modal/Base](/?path=/story/modal-base--standalone) page.

## FlowModal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | element, array | *required* | The flow modal steps |
| variant | string | `simple` | Sets the layout variant. Can be one of: `simple`, `simple-with-feedback` or `advanced` |
| step | string | *required* | Sets the current active step |
| showClose | bool | | Wether to show the close button or not |
| contentClassName | string | | A custom CSS class to add to the content container |

All the other base [Modal](/?path=/story/modal-base--standalone) props are supported.

## FlowModalStep props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| id | string | *required* | The step unique identifier |
| children | node | | The step contents |

Any other props will be spreaded into the step element.
