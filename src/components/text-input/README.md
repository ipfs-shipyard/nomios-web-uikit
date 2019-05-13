# Input

A text input with strength indication as option.

## Usage

```jsx
import { TextInput } from '@nomios/web-uikit';

<TextInput label="Label" placeholder="Hint Text" />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| label | string | | Defines a label for the input. |
| type | string | `text` | Sets the input type. Can be one of: `text` or `password`. |
| helperText | string | | Additional information to guide users. Left-aligned. |
| lineType | string | `normal`| Sets the type of the bottom border. Can be one of `normal` (single line) or `dashed` (for password strength indication). |
| feedback | object | | Adds a feedback message to the users. Right-aligned. More info on the next table. |
| lineStrength | number | | The current strength value. ⚠️ Please note that this value must be between 0 and 1. |

**Note:** Any props related to the input, such as `placeholder`, `onKeyUp` and `onChange`, will be spread to the underlying input element. Any other props will be spread into the root element.

### `feedback` prop

This object is used to pass down information to `<FeedbackMessage />` component.

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| message | string | *required* | The text message. |
| type | string | | Feedback message type. Can be one of: `error` or `info` as specified on `<FeedbackMessage />` component. |
| tooltip | node | | The contents of the feedback message tooltip. |
| className | string | | A classname to override styles. |

**Example:**

```jsx
const feedback = {
    message: 'Oops, something went wrong!',
    type: 'error',
}

<TextInput
    label="My example input"
    placeholder="Placeholder here"
    feedback={ feedback } />
```
