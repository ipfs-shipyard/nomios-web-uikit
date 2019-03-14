import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Modal, ModalLayout } from '../src';
import readme from '../src/components/modal-layout/README.md';

Modal.setAppElement('#root');

const style = {
    backgroundColor: '#686C71',
    color: 'white',
    height: '100%',
    padding: '2rem',
};

storiesOf('Modal Layout', module)
.addDecorator(withReadme(readme))
.add('Half panel', () => (
    <Modal isOpen>
        <ModalLayout variant="half-panel">
            <div style={ style }>The content goes here. This background color is just for demonstration purposes.</div>
        </ModalLayout>
    </Modal>
))
.add('Half panel bordered', () => (
    <Modal isOpen>
        <ModalLayout variant="half-panel-bordered">
            <div style={ style }>The content goes here. This background color is just for demonstration purposes.</div>
        </ModalLayout>
    </Modal>
))
.add('Wide panel', () => (
    <Modal isOpen>
        <ModalLayout variant="wide-panel">
            <div style={ style }>The content goes here. This background color is just for demonstration purposes.</div>
        </ModalLayout>
    </Modal>
));
