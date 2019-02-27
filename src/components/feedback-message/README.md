# Feedback Message

A feedback message component to provide feedback to the user.

## Usage

```jsx
import { FeedbackMessage } from '@idm/web-uikit';

<FeedbackMessage>Generic feedback</FeedbackMessage>

// Large variant
<FeedbackMessage variant="large">Generic feedback: large variant</FeedbackMessage>

// Feedback type error
<FeedbackMessage type="error">Something went wrong!</FeedbackMessage>
```

## Props
| name         | type   | default              | description                                                                                                     |
|--------------|--------|----------------------|-----------------------------------------------------------------------------------------------------------------|
| children     | string | *required*           | Text to render.                                                                                                 |
| variant      | string | `small`              | The variant of the feedback message, can be one of: `small` or `large`                                          |
| type         | string |                      | Can be one of: `error` or `info`. Sets the icon accordingly the type. If no type is passed, no icon is applied. |
| textColor    | string | rgba(75, 69, 61, .6) | Sets the color of the message. E.g.: `rgb(255, 172, 0)` or `#ffac00`.                                           |
| iconPosition | string | `left`               | Aligns the icon accordingly the passed value. Can be one of: `left`, `right`.                                   |
| className    | string |                      | A classname to override styles.                                                                                 |


**Note:** Both text and icon color will be set to `#d0021b` when `type` is set as `error`.
