import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { SplitButton, CopyIcon, EditIcon, TrashIcon } from '../src';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import readme from '../src/components/split-button/README.md';

const containerStyles = { maxWidth: '200px' };
const darkBackground = { name: 'dark', value: '#686C71' };
const handleActionClick = action('Clicked');

const actions = [
    { id: 'backup', icon: <CopyIcon />, text: 'Backup', onClick: handleActionClick },
    { id: 'edit', icon: <EditIcon />, text: 'Edit', onClick: handleActionClick },
    { id: 'delete', icon: <TrashIcon />, text: 'Delete', onClick: handleActionClick, disabled: true },
];

storiesOf('SplitButton', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Primary', () => (
    <div style={ containerStyles }>
        <SplitButton
            variant="primary"
            actions={ actions }
            mainActionId="backup" />
    </div>
))
.add('Negative', () => (
    <div style={ containerStyles }>
        <SplitButton
            variant="negative"
            actions={ actions }
            mainActionId="backup" />
    </div>
), {
    backgrounds: [{ ...darkBackground, default: true }],
})
.add('Knobs playground ⚽', () => {
    const variant = select('variant', ['primary', 'negative'], 'primary');

    return (
        <div style={ containerStyles }>
            <SplitButton
                variant={ variant }
                actions={ actions }
                mainActionId="backup" />
        </div>
    );
}, {
    backgrounds: [{ ...darkBackground, default: false }],
});
