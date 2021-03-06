import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { IdlePicker } from '../src';
import readme from '../src/components/idle-picker/README.md';
import { action } from '@storybook/addon-actions';

storiesOf('IdlePicker', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <div style={ { width: '47.4rem', margin: 'auto auto' } }>
        <IdlePicker defaultValue={ 3 } onChange={ action('changed') } />
    </div>
));
