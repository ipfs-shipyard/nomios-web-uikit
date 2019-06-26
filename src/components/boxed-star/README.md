# Boxed Star

Rounded corner box with centered figure.

## Usage

```jsx
import { BoxedStar } from '@nomios/web-uikit';

const handleRemove = () => alert('Remove');

<BoxedStar>
    <TrashIcon />
</BoxedStar>

<BoxedStar onRemove={ handleRemove }>
    <img src="https://example.com/foo.png" />
</BoxedStar>
```

### onRemove 

If this prop is passed a remove button will be presented on hover.

You may also pass an `id` prop that will be provided on remove.

```jsx
const handleRemove = (event, id) => console.log(id);

<BoxedStar id="foobar" onRemove={ handleRemove }>
    <img src="https://example.com/foo.png" />
</BoxedStar>
```

In the example above, on remove, a log will be produced with "foobar".

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | node | | The content of the box |
| onRemove | function | | Handler to be called on remove click |
| id | string | | Identifier. Currently provided on remove click |
| className | string | | A custom CSS class to add to the box container |
| contentClassName | string | | A custom CSS class to add to the box content container |
| removeClassName | string | | A custom CSS class to add to the remove button |
