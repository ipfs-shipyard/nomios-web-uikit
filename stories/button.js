import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Button } from '../src';
import readme from '../src/components/button/README.md';

const wrapperStyle = {
    backgroundColor: '#686C71',
    display: 'inline-block',
    height: '500px',
    width: '100%',
    padding: '10px',
};

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
    <div style={ wrapperStyle }>
        <Button variant="tertiary" onClick={ action('clicked') }>Click me</Button>
    </div>
))
.add('Negative', () => (
    <div style={ wrapperStyle }>
        <Button variant="negative" onClick={ action('clicked') }>Click me</Button>
    </div>
))
.add('Knobs playground ⚽', () => {
    const variant = select('variant', ['primary', 'secondary', 'tertiary', 'negative'], 'primary');
    const disabled = boolean('disabled');
    const fullWidth = boolean('fullWidth');
    const feedback = select('feedback', ['none', 'loading', 'success', 'error']);
    const children = text('children', 'Click me');

    return (
        <div style={ variant === 'tertiary' || variant === 'negative' ? wrapperStyle : undefined }>
            <Button
                variant={ variant }
                disabled={ disabled }
                fullWidth={ fullWidth }
                feedback={ feedback }
                onClick={ action('clicked') }>
                { children }
            </Button>
        </div>
    );
});
