import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { Slider } from '../src';
import readme from '../src/components/slider/README.md';
import { action } from '@storybook/addon-actions';

storiesOf('Slider', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Slider', () => (
    <div style={ { width: '47.4rem', margin: 'auto auto' } }>
        <Slider defaultValue={ 3 } handleSliderChange={ action('clicked!') } />
    </div>
));
