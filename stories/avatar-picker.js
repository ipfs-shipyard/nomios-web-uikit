import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import { AvatarPicker } from '../src';
import readme from '../src/components/avatar-picker/README.md';

const imageURL = 'https://en.gravatar.com/userimage/82191959/d19ac0b9d69bd38f1451cc524b77f290.jpg?size=200';

storiesOf('AvatarPicker', module)
.addDecorator(withReadme(readme))
.add('With name', () => {
    const onChangeAction = action('OnChange');
    const handleOnChange = (image) => {
        onChangeAction(`New image loaded: ${image}`);
    };

    return (
        <AvatarPicker
            label="Add photo"
            name="Pedro Santos"
            onChange={ handleOnChange } />
    );
})
.add('Without name', () => {
    const onChangeAction = action('OnChange');
    const handleOnChange = (image) => {
        onChangeAction(`New image loaded: ${image}`);
    };

    return (
        <AvatarPicker
            label="Add photo"
            onChange={ handleOnChange } />
    );
})
.add('With image', () => {
    const onChangeAction = action('OnChange');
    const handleOnChange = (image) => {
        onChangeAction(`New image loaded: ${image}`);
    };

    return (
        <AvatarPicker
            label="Add photo"
            imageURL={ imageURL }
            onChange={ handleOnChange } />
    );
});
