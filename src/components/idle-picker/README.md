# Idle Picker

A standard Idle Picker input.

## Usage

```jsx
import { IdlePicker } from '@nomios/web-uikit';

<IdlePicker onChange={ handleChange } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| defaultValue | number | 3 | Sets the starting value of the idle picker. Accepts a value between 1 and 10 |
| onChange | function | | Sets a function to be called when the value of the idle picker is changed. Receives the current value as an argument |
