import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import { AvatarController } from '../src';
import readme from '../src/components/avatar-controller/README.md';

storiesOf('AvatarController', module)
.addDecorator(withReadme(readme))
.add('Default', () => {
    const onChangeAction = action('OnChange');
    const handleOnChange = (image) => {
        onChangeAction(`New image loaded: ${image}`);
    };

    return (
        <AvatarController
            label="Add photo"
            text="PS"
            onChange={ handleOnChange } />
    );
});
