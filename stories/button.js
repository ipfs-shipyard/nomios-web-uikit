import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Button } from '../src';
import readme from '../src/components/button/README.md';

const darkBackground = { name: 'dark', value: '#686C71' };

storiesOf('Button', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Primary', () => (
    <Button variant="primary" onClick={ action('clicked') }>Click me</Button>
))
.add('Secondary', () => (
    <Button variant="secondary" onClick={ action('clicked') }>Click me</Button>
))
.add('Tertiary', () => (
    <Button variant="tertiary" onClick={ action('clicked') }>Click me</Button>
), {
    backgrounds: [{ ...darkBackground, default: true }],
})
.add('Negative', () => (
    <Button variant="negative" onClick={ action('clicked') }>Click me</Button>
), {
    backgrounds: [{ ...darkBackground, default: true }],
})
.add('Knobs playground ⚽', () => {
    const variant = select('variant', ['primary', 'secondary', 'tertiary', 'negative'], 'primary');
    const disabled = boolean('disabled');
    const fullWidth = boolean('fullWidth');
    const feedback = select('feedback', ['none', 'loading', 'success', 'error']);
    const children = text('children', 'Click me');

    return (
        <Button
            variant={ variant }
            disabled={ disabled }
            fullWidth={ fullWidth }
            feedback={ feedback }
            onClick={ action('clicked') }
            onAnimationEnd={ action('animation end') }>
            { children }
        </Button>
    );
}, {
    backgrounds: [{ ...darkBackground, default: false }],
});
