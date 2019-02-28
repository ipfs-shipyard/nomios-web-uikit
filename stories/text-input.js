import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { TextInput } from '../src';
import readme from '../src/components/text-input/README.md';

storiesOf('Text input', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <TextInput
        label="Label"
        placeholder="Hint Text" />
))
.add('With Helper Text', () => (
    <TextInput
        label="Label"
        placeholder="Hint Text"
        helperText="Helper text" />
))
.add('With Feedback Message', () => (
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
    const feedbackType = select('feedback type', ['', 'error', 'info'], '');
    const successLine = boolean('with success line');
    const useStrengthIndicator = boolean('use strength indicator');
    const strengthIndicator = useStrengthIndicator ?
        object('strength indicator', { range: { min: 0, max: 100 }, strength: 0 }) :
        null;

    return (
        <TextInput
            label={ label }
            placeholder={ placeholder }
            type={ type }
            helperText={ helperText }
            successLine={ successLine }
            feedback={ { message: feedbackMessage, type: feedbackType } }
            strengthIndicator={ strengthIndicator } />
    );
});
