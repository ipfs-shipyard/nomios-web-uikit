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

There are four different layouts for the modal: `half`, `half-bordered`, `wide`, `full`. The layout applied depends on the chosen variant:
- `simple` - only `half` layout is applied;
- `simple-with-feedback` - `half` layout is applied to all steps except for the last one. The last step is `full`;
- `advanced` - `half-bordered` is applied to the first step; `full` layout is applied to the last step; to the other steps `wide` layout is applied.

## ModalFlow Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | `simple` | Sets the layout variant. Can be one of: `simple`, `simple-with-feedback` or `advanced` |
| step | string | | Sets the current active step |

## ModalStep Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| id | string | *required* | This prop is the step identifier |
