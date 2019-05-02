import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import { AvatarPicker, EntityIcon } from '../src';
import readme from '../src/components/avatar-picker/README.md';

const imageUrl = 'https://en.gravatar.com/userimage/82191959/d19ac0b9d69bd38f1451cc524b77f290.jpg?size=200';

storiesOf('AvatarPicker', module)
.addDecorator(withReadme(readme))
.add('With name', () => (
    <AvatarPicker
        label="Add photo"
        name="Pedro Santos"
        onChange={ action('changed') } />
))
.add('Without name', () => (
    <AvatarPicker
        label="Add photo"
        onChange={ action('changed') } />
))
.add('With custom icon', () => (
    <AvatarPicker
        icon={ <EntityIcon /> }
        label="Add photo"
        onChange={ action('changed') } />
))
.add('With image', () => (
    <AvatarPicker
        label="Add photo"
        image={ imageUrl }
        onChange={ action('changed') } />
));
