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
| successLine       | bool   |         | Changes input border-bottom color to green when set to true.                                       |
| feedback          | object |         | Adds a feedback message to the users. Right-aligned. More info on the next table.                  |
| strengthIndicator | object |         | Replace the input border-bottom for strength indication bars. See the next table for further info. |
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

### strength indicator prop

| name           | type   | default | description                                                                                                 |
|----------------|--------|---------|-------------------------------------------------------------------------------------------------------------|
| range          | object |         | This object must contain `min` and `max` properties as number. It'll be used to specify the strength range. |
| strength       | number |         | The current strength value.                                                                                 |
| numberOfLevels | number |    4    | Number of levels of strength to be considered.                                                              |

**Example:**
```js
const strengthIndicator = {
    range: {
        min: 0,
        max: 100,
    },
    strength: 35,
}

<TextInput
    label="My example input"
    placeholder="Placeholder here"
    strengthIndicator={ strengthIndicator } />
```
