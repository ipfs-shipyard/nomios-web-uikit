import React, { forwardRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Tooltip, TooltipTrigger, Button } from '../src';
import readme from '../src/components/tooltip/README.md';

const LoremIpsumTooltip = forwardRef((props, ref) => (
    <Tooltip ref={ ref } style={ { maxWidth: 250 } } { ...props }>
        Nullam a felis porta, sollicitudin justo vel, dignissim libero
    </Tooltip>
));

const styles = {
    container: { maxWidth: 200, margin: '200px auto', textAlign: 'center' },
    button: { marginBottom: 50 },
};

storiesOf('Tooltip', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard trigger', () => (
    <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="bottom" /> }>
        <Button variant="primary">Hover me</Button>
    </TooltipTrigger>
))
.add('Custom trigger (click)', () => (
    <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="right" /> }>
        { ({ toggle }) => (
            <Button
                variant="primary"
                onClick={ toggle }>
                Click me
            </Button>
        ) }
    </TooltipTrigger>
))
.add('All placements', () => (
    <div style={ styles.container }>
        <TooltipTrigger tooltip={ <LoremIpsumTooltip /> }>
            <Button variant="primary" style={ styles.button }>Auto</Button>
        </TooltipTrigger>

        <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="top" /> }>
            <Button variant="primary" style={ styles.button }>Top</Button>
        </TooltipTrigger>

        <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="bottom" /> }>
            <Button variant="primary" style={ styles.button }>Bottom</Button>
        </TooltipTrigger>

        <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="left" /> }>
            <Button variant="primary" style={ styles.button }>Left</Button>
        </TooltipTrigger>

        <TooltipTrigger tooltip={ <LoremIpsumTooltip placement="right" /> }>
            <Button variant="primary" style={ styles.button }>Right</Button>
        </TooltipTrigger>
    </div>
))
.add('Knobs playground ⚽', () => {
    const variant = select('variant', ['light', 'dark'], 'light');
    const placement = select('placement', ['auto', 'top', 'right', 'bottom', 'left'], 'auto');
    const trigger = select('trigger', ['standard', 'click', 'click-toggle', 'hover'], 'standard');
    const shouldCloseOnEsc = boolean('shouldCloseOnEsc', true);
    const shouldCloseOnOutsideClick = boolean('shouldCloseOnOutsideClick', true);
    const content = text('tooltip', 'My awesome tooltip content');

    const tooltip = (
        <Tooltip
            variant={ variant }
            placement={ placement }
            shouldCloseOnEsc={ shouldCloseOnEsc }
            shouldCloseOnOutsideClick={ shouldCloseOnOutsideClick }
            onEntered={ action('entered') }
            onExited={ action('exited') }>
            { content }
        </Tooltip>
    );

    return (
        <div style={ styles.container }>
            <TooltipTrigger tooltip={ tooltip }>
                { (() => {
                    switch (trigger) {
                    case 'click':
                        return ({ open }) => <Button variant="primary" onClick={ open }>Click me</Button>;
                    case 'click-toggle':
                        return ({ toggle }) => <Button variant="primary" onClick={ toggle }>Click me</Button>;
                    case 'hover':
                        return ({ open, close }) => (
                            <Button
                                variant="primary"
                                onMouseEnter={ () => open(TooltipTrigger.defaultHoverDelay) }
                                onMouseLeave={ () => close(TooltipTrigger.defaultHoverDelay) }>Hover me</Button>
                        );
                    default:
                        return <Button variant="primary">Hover me</Button>;
                    }
                })() }
            </TooltipTrigger>
        </div>
    );
});
