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
    <Radio label="Example" name="group" value="example" onChange={ selectedAction } />
))
.add('Multiple Options', () => (
    <div style={ groupStyles }>
        <Radio label="Istanbul" name="group" value="istanbul" onChange={ selectedAction } />
        <Radio label="Moscow" name="group" value="moscow" onChange={ selectedAction } />
        <Radio label="London" name="group" value="london" onChange={ selectedAction } />
    </div>
));
