# Slider

A standard slider input.

## Usage

```jsx
import { Slider } from '@idm/web-uikit';

<Slider handleSliderChange={ handleChange } />
```

## Props
| name                | type     | default    | description                                                                                                     |
|---------------------|----------|------------|-----------------------------------------------------------------------------------------------------------------|
| defaultValue        | number   | 3          | Sets the starting value of the slider. Accepts a value between 1 and 10                                         |
| handleSliderChange  | function |            | Sets a function to be called when the value of the slider is changed. Receives the current value as an argument |
