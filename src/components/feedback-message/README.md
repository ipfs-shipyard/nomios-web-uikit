# Feedback Message

A feedback message component to provide feedback to the user.

## Usage

```jsx
import { FeedbackMessage } from '@nomios/web-uikit';

<FeedbackMessage>Generic feedback</FeedbackMessage>

// Large variant
<FeedbackMessage variant="large">Generic feedback: large variant</FeedbackMessage>

// Feedback type error
<FeedbackMessage type="error">Something went wrong!</FeedbackMessage>
```

### Changing the color

The color of the message and the icon will depend on the `type` property.

Still, you may change the color of the message and icon via the `color` and `fill` CSS properties respectively:

```jsx
import { FeedbackMessage } from '@nomios/web-uikit';

<FeedbackMessage style={ { color: 'yellow', fill: 'red' } } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | node | *required* | The contents to render, usually a text |
| variant | string | `small` | The variant of the feedback message, can be one of: `small` or `large` |
| type | string | | Can be one of: `error` or `info`. Sets the icon accordingly the type. If no type is passed, no icon is applied. |
| iconPosition | string | `left` | Aligns the icon accordingly the passed value. Can be one of: `left`, `right`. |
| tooltip | node | | Tooltip content. If this prop is provided, a tooltip is created and it'll be triggered on icon hover. |
| className | string | | A classname to override styles. |

**Note:** Both text and icon color will be set to `#d0021b` when `type` is set as `error`.
