# Modal Flow

A component for modal flows. The layout will be inferred considering the flow variant.

## Usage

`<ModalFlow>` should be used along with `<ModalStep>`.

```jsx
import { ModalFlow } from '@nomios/web-uikit';

<Modal isOpen>
    <ModalFlow variant="simple" step="first">
        <ModalStep id="first">
            This is the first step.
            <button onClick={ () => store.set({ stepId: 'second' }) } >Next step</button>
        </ModalStep>
        <ModalStep id="second">
            This is the second step.
            <button onClick={ () => store.set({ stepId: 'first' }) } >Next step</button>
        </ModalStep>
    </ModalFlow>
</Modal>
```

There are four different layouts for the modal: half, half-bordered, wide, full. The layout applied depends on the chosen variant. The following diagrams demonstrate how layouts are applied:

`simple`
![simple](https://i.imgur.com/uJlXbSh.png)

`simple-with-feedback`
![simple-with-feedback](https://i.imgur.com/O70aTas.png)

`advanced`
![advanced](https://i.imgur.com/gMXO7mD.png)

## ModalFlow Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | `simple` | Sets the layout variant. Can be one of: `simple`, `simple-with-feedback` or `advanced` |
| step | string | | Sets the current active step |

## ModalStep Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| id | string | *required* | This prop is the step identifier |
