import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Avatar } from '../src';
import readme from '../src/components/avatar/README.md';

const imageUrl = 'https://en.gravatar.com/userimage/82191959/d19ac0b9d69bd38f1451cc524b77f290.jpg?size=200';

storiesOf('Avatar', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('With name', () => (
    <Avatar name="Pedro Santos" />
))
.add('Without name', () => (
    <Avatar />
))
.add('With image', () => (
    <Avatar image={ imageUrl } />
))
.add('Knobs playground ⚽', () => {
    const name = text('name', 'Pedro Santos');
    const image = text('image', imageUrl);
    const preloadImage = boolean('preloadImage', true);

    return <Avatar name={ name } image={ image } preloadImage={ preloadImage } />;
});
