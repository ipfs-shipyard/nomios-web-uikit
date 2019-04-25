# Type Group

A standard Type Group input.

## Usage

The `<TypeGroup>` component should be used along with `<TypeOption>`. However, `<TypeOption>` can be used independently.

```jsx
import { TypeGroup, TypeOption, UserIcon, EntityIcon, CheckmarkIcon } from '@nomios/web-uikit';

<TypeGroup name="example" onSelect={ handleOnSelect }>
    <TypeOption id="1" label="Person" badge={ CheckmarkIcon }>
        <UserIcon />
    </TypeOption>
    <TypeOption id="2" label="Organization" badge={ CheckmarkIcon }>
        <EntityIcon />
    </TypeOption>
</TypeGroup>
```

## TypeGroup props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| name | string | *required* | A descriptor to relate every TypeOption in the same group |
| onSelect | function | *required* | A function to be called whenever a TypeOption changes |
| children | node | *required* | The content to render, usually an array of <TypeOption> elements |
| className | string | | A classname to override styles |
| selectedId | string | | Sets the current selected option |

## TypeOption props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| id | string | *required* | An identifier that uniquely identifies this option |
| selected | boolean | false | Specifies whether the option is selected or not |
| groupName | string | | Sets the name property of the input field |
| selectable | boolean | true | Specifies whether the element is disabled or not |
| label | string | | Sets the label text |
| badge | function | | Sets the badge icon to be rendered when component is selected |
| onSelect | function | | A function to be called whenever the option changes. The option id is passed as argument |
| children | node | | The content to render, usually a SVG icon |
