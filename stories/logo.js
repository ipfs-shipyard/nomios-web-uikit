import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { Logo } from '../src';
import readme from '../src/components/logo/README.md';

storiesOf('Logo', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Symbol', () => (
    <Logo variant="symbol" />
))
.add('Logotype', () => (
    <Logo variant="logotype" />
))
.add('Horizontal', () => (
    <Logo variant="horizontal" />
))
.add('Vertical', () => (
    <Logo variant="vertical" />
))
.add('Knobs playground ⚽', () => {
    const variant = select('variant', ['symbol', 'logotype', 'horizontal', 'vertical'], 'symbol');
    const style = object('style', { fill: 'red' });

    return (
        <Logo variant={ variant } style={ style } />
    );
});
