import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { FeedbackMessage } from '../src';
import readme from '../src/components/feedback-message/README.md';

const wrapperStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '280px',
};

storiesOf('Feedback Message', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Small', () => (
    <div style={ wrapperStyle }>
        <FeedbackMessage textColor="green">Great</FeedbackMessage>
        <FeedbackMessage>1/6</FeedbackMessage>
        <FeedbackMessage type="error">Passphrase is too short!</FeedbackMessage>
        <FeedbackMessage type="info">Generic feedback</FeedbackMessage>
        <FeedbackMessage type="info" textColor="#ffac00" iconPosition="right">Fair</FeedbackMessage>
        <FeedbackMessage type="info">Generic feedback with two lines of text</FeedbackMessage>
    </div>
))
.add('Large', () => (
    <div style={ wrapperStyle }>
        <FeedbackMessage
            type="error"
            variant="large">
            Oops, seems that recovery key is not valid, please try again.
        </FeedbackMessage>
        <FeedbackMessage
            type="info"
            variant="large">
            Generic feedback message with two lines of text.
        </FeedbackMessage>
        <FeedbackMessage
            type="info"
            variant="large">
            Generic feedback message filled with more than three lines of plain text.
        </FeedbackMessage>
    </div>
))
.add('With tooltip', () => (
    <div style={ wrapperStyle }>
        <FeedbackMessage
            type="info"
            iconPosition="left"
            variant="small"
            tooltip="My cool tooltip content">
        Try hover the icon
        </FeedbackMessage>
    </div>
))
.add('Knobs playground ⚽', () => {
    const children = text('children', 'Generic feedback message');
    const variant = select('variant', ['small', 'large'], 'small');
    const type = select('type', [undefined, 'error', 'info']);
    const textColor = text('text color', '');
    const iconPosition = select('icon position', ['left', 'right'], 'left');

    return (
        <div style={ wrapperStyle }>
            <FeedbackMessage
                variant={ variant }
                type={ type }
                textColor={ textColor }
                iconPosition={ iconPosition }>
                { children }
            </FeedbackMessage>
        </div>
    );
});
