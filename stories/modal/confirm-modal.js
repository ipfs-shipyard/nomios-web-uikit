import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ConfirmModal } from '../../src';
import readme from '../../src/components/modals/confirm-modal/README.md';

storiesOf('Modal/ConfirmModal', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <ConfirmModal
        open
        title="Delete identity from this device?"
        description="You're about to delete this identity from the last device but you'll be able to import it again."
        onConfirm={ action('Confirm') }
        onCancel={ action('Cancel') } />
))
.add('Knobs playground ⚽', () => {
    const isOpen = boolean('isOpen', true);
    const title = text('title', 'Delete identity from this device?');
    const description = text('description', 'You are about to delete this identity from the last device but you will be able to import it again.');
    const confirmText = text('confirmText', 'Yes, delete.');
    const confirmVariant = select('confirmVariant', ['primary', 'secondary'], 'secondary');
    const cancelText = text('cancelText', 'No, cancel.');
    const cancelVariant = select('cancelVariant', ['primary', 'secondary'], 'primary');

    return (
        <ConfirmModal
            open={ isOpen }
            title={ title }
            description={ description }
            confirmText={ confirmText }
            confirmVariant={ confirmVariant }
            cancelText={ cancelText }
            cancelVariant={ cancelVariant }
            onConfirm={ action('Confirm') }
            onCancel={ action('Cancel') } />
    );
});
