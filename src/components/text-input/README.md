# Input

A text input with strength indication as option.

## Usage

```jsx
import { TextInput } from '@idm/web-uikit';

<TextInput label="Label" placeholder="Hint Text" />
```

## Props

| name              | type   | default | description                                                                                        |
|-------------------|--------|---------|----------------------------------------------------------------------------------------------------|
| label             | string |         | Defines a label for the input.                                                                     |
| placeholder       | string |         | Sets the input placeholder                                                                         |
| type              | string | `text`  | Sets the input type. Can be one of: `text` or `password`.                                          |
| helperText        | string |         | Additional information to guide users. Left-aligned.                                               |
| lineType          | string | `normal`| Sets the type of the bottom border. Can be one of `normal` (single line) or `dashed` (for password strength indication).  |
| feedback          | object |         | Adds a feedback message to the users. Right-aligned. More info on the next table.                  |
| lineStrength      | number |         | The current strength value. ⚠️ Please note that this value must be between 0 and 1. |
| onChange          | func   |         | Function to be called whenever the input content changes.                                          |
| className         | string |         | A classname to override styles.                                                                    |

### feedback prop

This object is used to pass down information to `<FeedbackMessage />` component.

| name      | type   | default    | description                                                                                              |
|-----------|--------|------------|----------------------------------------------------------------------------------------------------------|
| message   | string | *required* | The text message.                                                                                        |
| type      | string |            | Feedback message type. Can be one of: `error` or `info` as specified on `<FeedbackMessage />` component. |
| className | string |            | A classname to override styles.                                                                          |

**Example:**
```js
const feedback = {
    message: 'Oops, something went wrong!',
    type: 'error',
}

<TextInput
    label="My example input"
    placeholder="Placeholder here"
    feedback={ feedback } />
```
