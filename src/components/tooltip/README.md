# Tooltip

A tooltip to display content anchored to an element.

## Usage

```jsx
import { TooltipTrigger, Tooltip } from '@idm/web-uikit';

const tooltip = <Tooltip>I'm a text in a tooltip.</Tooltip>

// Simple usage, triggers when clicking and hovering
<TooltipTrigger tooltip={ tooltip }>
    <Button variant="primary">Click or hover me</Button>
</TooltipTrigger>

// Equivalent to the previous one but with a children as a function
// You may use `isOpen` to highlight the trigger
<TooltipTrigger tooltip={ tooltip }>
    { ({ isOpen, defaultEventProps }) =>
        <Button variant="primary" { ...defaultEventProps }>Click or hover me</Button> }
</TooltipTrigger>

// Custom trigger
<TooltipTrigger tooltip={ tooltip }>
    { ({ toggle }) => <Button variant="primary" onClick={ toggle }>Click me</Button> }
</TooltipTrigger>
```

The usage is very similar to the `Modal` component, except that `Tooltip` can't be used standalone.

Please note that both the tooltip and the trigger must support attaching refs. If you are using stateless components, be sure to use [forwardRef](https://reactjs.org/docs/forwarding-refs.html).

## TooltipTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| tooltip | element | *required* | The tooltip to show |
| children | element, function | *required* | The trigger element or render prop function that should return the trigger element |
| onOpen | function | | Function called when the tooltip opens |
| onClose | function | | Function called when the tooltip closes |

If `children` is a react element, event properties such as `onClick` will be added to it.
For advanced cases, `children` may be a render function which is called with:

```js
{
    // Boolean indicating if the tooltip is open
    isOpen,
    // Call this to open the tooltip, optionally with a delay
    open(delay = 0),
    // Call this to cancel a previously made `cancel` call
    cancelOpen(),
    // Call this to close the tooltip, optionally with a delay
    close(delay = 0),
    // Call this to toggle between open/close, optionally with a delay
    toggle(delay = 0),
    // Object with all event props that would have been added if the
    // trigger was an element
    defaultEventProps,
}
```

You may access `TooltipTrigger.defaultHoverDelay` to get the standard mouse enter/leave delay.

## Tooltip props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| placement | string | `auto` | The tooltip placement, can be one of: `auto`, `top`, `right`, `left`, `bottom` |
| variant | string | `light` | The tooltip variant, can be one of: `light`, `dark` |
| viewportMargin | number | 10 | Specifies how close to the edge of the window the tooltip can appear (in pixels) |
| boundariesElement | string | `scrollParent` | Which element to consider when calculating if the tooltip overflows, can be one of: `scrollParent`, `window` or `viewport` |
| boxClassName | string | | The CSS class to give to the box element that wraps the content element (useful to adjust padding or size) |
| contentClassName | string | | The CSS class to give to the content element |
| shouldCloseOnEsc | bool | true | True to close on escape keypress |
| shouldCloseOnOutsideClick | bool | true | True to close when clicking outside the tooltip |
| children | node | *required* | The tooltip content |

Any other properties supplied will be spread to the root element (tooltip).

Important notes:

- The tooltip doesn't have a with nor height set and will adjust itself based on its contents. You may define a size by passing a `contentClassName`.
- The tooltip will have a padding of `2em` by default. You may redefine it by passing `contentClassName` as well.
