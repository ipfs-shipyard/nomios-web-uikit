import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Circle, UserIcon } from '../src';
import readme from '../src/components/circle/README.md';

const imageURL = 'https://intermountainhealthcare.org/-/media/images/modules/physician-directory/profile-female-placeholder.png?mh=320&mw=320';

storiesOf('Circle', module)
.addDecorator(withReadme(readme))
.add('Image', () => (
    <Circle imageURL={ imageURL } />
))
.add('Text', () => (
    <Circle text="AC" />
))
.add('Icon', () => (
    <Circle icon={ <UserIcon /> } />
));
