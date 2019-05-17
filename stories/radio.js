import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import { Radio } from '../src';
import readme from '../src/components/radio/README.md';

const selectedAction = action('Changed');
const groupStyles = {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '30%',
};

storiesOf('Radio', module)
.addDecorator(withReadme(readme))
.add('Single', () => (
    <Radio label="Example" onChange={ selectedAction } />
))
.add('Multiple Options', () => (
    <group style={ groupStyles }>
        <Radio label="Istanbul" name="group" onChange={ selectedAction } />
        <Radio label="Moscow" name="group" onChange={ selectedAction } />
        <Radio label="London" name="group" onChange={ selectedAction } />
    </group>
));
