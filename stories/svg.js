import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { Svg } from '../src';
import readme from '../src/components/svg/README.md';

const svgContent = import(/* webpackChunkName: "svg-sprite" */ './media/elm.svg');

storiesOf('Svg', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Knobs playground ⚽', () => {
    const style = object('style', { stroke: 'red', color: 'red', width: '50rem' });

    return (
        <Svg svg={ svgContent } style={ style } />
    );
});
