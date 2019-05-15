import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { TextButton, EditIcon } from '../src';
import readme from '../src/components/text-button/README.md';

storiesOf('TextButton', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard', () => (
    <TextButton onClick={ action('clicked') }>Click me</TextButton>
))
.add('With an icon (right)', () => (
    <TextButton
        icon={ <EditIcon /> }
        onClick={ action('clicked') }>
        You can click me
    </TextButton>
))
.add('With an icon (left)', () => (
    <TextButton
        icon={ <EditIcon /> }
        iconPosition="left"
        onClick={ action('clicked') }>
        You can click me
    </TextButton>
))
.add('Knobs playground ⚽', () => {
    const withIcon = boolean('withIcon');
    const iconPosition = select('iconPosition', ['left', 'right'], 'right');
    const disabled = boolean('disabled');
    const children = text('children', 'Click me');

    return (
        <TextButton
            icon={ withIcon ? <EditIcon /> : undefined }
            iconPosition={ iconPosition }
            disabled={ disabled }
            onClick={ action('clicked') }>
            { children }
        </TextButton>
    );
});
