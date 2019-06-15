import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Transition } from 'react-transition-group';
import { ModalGlobalProvider, withModalGlobal, Modal, ModalClose, Button } from '../src';
import readme from '../src/components/modal-global/README.md';

const WrappedComponent = withModalGlobal(({ globalModal: { openModal } }) => (
    <Button onClick={ () => openModal(<LoremIpsumModal />) }>
        Open Modal Imperatively
    </Button>
));

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

storiesOf('ModalGlobal', module)
.addDecorator(withReadme(readme))
.add('Default', () => (
    <ModalGlobalProvider>
        <WrappedComponent />
    </ModalGlobalProvider>
));
