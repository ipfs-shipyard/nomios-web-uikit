import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, number } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { TextInput } from '../src';
import readme from '../src/components/text-input/README.md';

storiesOf('TextInput', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <TextInput
        label="Label"
        placeholder="Hint Text" />
))
.add('With helper text', () => (
    <TextInput
        label="Label"
        placeholder="Hint Text"
        helperText="Helper text" />
))
.add('With feedback message', () => (
    <TextInput
        label="Label"
        placeholder="Hint Text"
        feedback={ { message: 'Feedback Message', type: 'error' } } />
))
.add('Knobs playground ⚽', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Hint Text');
    const type = select('input type', ['text', 'password'], 'text');
    const helperText = text('helper text', '');
    const feedbackMessage = text('feedback message', '');
    const feedbackType = select('feedback type', [null, 'error', 'info'], null);
    const lineType = select('lineType', ['normal', 'dashed'], 'normal');
    const lineStrength = number('line strength');

    return (
        <TextInput
            label={ label }
            placeholder={ placeholder }
            type={ type }
            helperText={ helperText }
            lineType={ lineType }
            lineStrength={ lineStrength != null ? lineStrength : undefined }
            feedback={ { message: feedbackMessage, type: feedbackType } } />
    );
});
