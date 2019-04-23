import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Transition } from 'react-transition-group';
import { Modal, ModalClose, ModalTrigger, Button } from '../../src';
import readme from '../../src/components/modal-base/README.md';

const FadeModal = ({ children, ...rest }) => (
    <Modal { ...rest }>
        <Transition timeout={ 300 }>
            { (state) => (
                <div style={ {
                    ...{ padding: '5rem', transition: 'opacity 300ms ease-in-out' },
                    ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 },
                } }>
                    <ModalClose />
                    { children }
                </div>
            ) }
        </Transition>
    </Modal>
);

const LoremIpsumModal = (props) => (
    <FadeModal { ...props }>
        Nullam a felis porta, sollicitudin justo vel, <a href="#foo">dignissim</a> libero.
        Integer venenatis tincidunt enim, sit amet sagittis erat suscipit et.
        Aenean consequat erat egestas fringilla bibendum. Ut malesuada risus dui, id maximus dolor accumsan vitae.
        Pellentesque dictum erat sed auctor suscipit. Aliquam eu iaculis nunc, a gravida nunc.
        Quisque erat lacus, iaculis ut rutrum id, condimentum id magna. Aliquam at nisi lobortis, gravida mi a, malesuada orci.
        Pellentesque non sollicitudin est, in rhoncus mauris.
        Nulla nulla nibh, ultricies ut <a href="#foo">nulla</a> sit amet, scelerisque feugiat neque.
        Donec at lectus ultrices, sollicitudin lacus ut, cursus eros.
        Maecenas nunc turpis, vestibulum vitae consequat in, eleifend aliquam mi. Curabitur sed nulla in nisi posuere mattis.
        Nunc faucibus scelerisque imperdiet. Proin fermentum rutrum quam, vitae sagittis est rhoncus nec.
        Integer auctor, libero eu convallis pellentesque, odio risus cursus tortor, tincidunt tincidunt magna diam vel magna.
    </FadeModal>
);

storiesOf('Modal/Base', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standalone', () => (
    <LoremIpsumModal open />
))
.add('Standard trigger', () => (
    <ModalTrigger modal={ <LoremIpsumModal /> }>
        <Button variant="primary">Click me</Button>
    </ModalTrigger>
))
.add('Custom trigger (hover)', () => (
    <ModalTrigger modal={ <LoremIpsumModal /> }>
        { ({ open, cancelOpen }) => (
            <Button
                variant="primary"
                onMouseEnter={ () => open(200) }
                onMouseLeave={ cancelOpen }>Hover me</Button>
        ) }
    </ModalTrigger>
))
.add('Within scrollable body', () => (
    <div style={ { height: 20000 } }>
        <div style={ { height: 200 } } />

        <ModalTrigger modal={ <LoremIpsumModal /> }>
            <Button variant="primary">Click me</Button>
        </ModalTrigger>
    </div>
))
.add('Large contents', () => (
    <FadeModal open>
            Nullam a felis porta, sollicitudin justo vel, <a href="#foo">dignissim</a> libero.
            Integer venenatis tincidunt enim, sit amet sagittis erat suscipit et.
            Aenean consequat erat egestas fringilla bibendum. Ut malesuada risus dui, id maximus dolor accumsan vitae.

        <div style={ { height: 700 } } />

            Pellentesque dictum erat sed auctor suscipit. Aliquam eu iaculis nunc, a gravida nunc.
            Quisque erat lacus, iaculis ut rutrum id, condimentum id magna. Aliquam at nisi lobortis, gravida mi a, malesuada orci.
            Pellentesque non sollicitudin est, in rhoncus mauris.

        <div style={ { height: 700 } } />

            Nulla nulla nibh, ultricies ut <a href="#foo">nulla</a> sit amet, scelerisque feugiat neque.
            Donec at lectus ultrices, sollicitudin lacus ut, cursus eros.
            Maecenas nunc turpis, vestibulum vitae consequat in, eleifend aliquam mi. Curabitur sed nulla in nisi posuere mattis.

        <div style={ { height: 700 } } />

            Nunc faucibus scelerisque imperdiet. Proin fermentum rutrum quam, vitae sagittis est rhoncus nec.
            Integer auctor, libero eu convallis pellentesque, odio risus cursus tortor, tincidunt tincidunt magna diam vel magna.
    </FadeModal>
))
.add('Knobs playground ⚽', () => {
    const trigger = select('trigger', ['standard', 'hover'], 'standard');
    const shouldCloseOnEsc = boolean('shouldCloseOnEsc', false);
    const shouldCloseOnOverlayClick = boolean('shouldCloseOnOverlayClick', false);
    const content = text('content', 'My awesome modal contents');

    const modal = (
        <FadeModal
            shouldCloseOnEsc={ shouldCloseOnEsc }
            shouldCloseOnOverlayClick={ shouldCloseOnOverlayClick }
            onEntered={ action('entered') }
            onExited={ action('exited') }>
            { content }
        </FadeModal>
    );

    return (
        <ModalTrigger modal={ modal }>
            { (() => {
                switch (trigger) {
                case 'hover':
                    return ({ open, cancelOpen }) => (
                        <Button
                            variant="primary"
                            onMouseEnter={ () => open(200) }
                            onMouseLeave={ cancelOpen }>Hover me</Button>
                    );
                default:
                    return <Button variant="primary">Click me</Button>;
                }
            })() }
        </ModalTrigger>
    );
});
