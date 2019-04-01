import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { State, Store } from '@sambego/storybook-state';
import { Modal, ModalFlow, ModalStep } from '../src';
import readme from '../src/components/modal-flow/README.md';

Modal.setAppElement('#root');

const steps = [
    {
        id: 'first',
        content: 'This is the first step.',
        goToId: 'second',
    },
    {
        id: 'second',
        content: 'This is the second step.',
        goToId: 'third',
    },
    {
        id: 'third',
        content: 'This is the third step.',
        goToId: 'fourth',
    },
    {
        id: 'fourth',
        content: 'This is the fourth step.',
        goToId: 'last',
    },
    {
        id: 'last',
        content: 'This is the last step.',
        goToId: 'third',
    },
];

storiesOf('Modal Flow', module)
.addDecorator(withReadme(readme))
.add('Simple', () => {
    const store = new Store({
        stepId: 'first',
    });

    return (
        <Fragment>
            <State store={ store }>
                {(state) =>
                    (<Modal isOpen>
                        <ModalFlow variant="simple" step={ state.stepId }>
                            { steps.map((step, index) => (
                                <ModalStep key={ index } id={ step.id }>
                                    { step.content }
                                    <button onClick={ () => store.set({ stepId: step.goToId }) } >Go to { step.goToId } step</button>
                                </ModalStep>
                            )) }
                        </ModalFlow>
                    </Modal>)
                }
            </State>
        </Fragment>
    );
})
.add('Simple With Feedback', () => {
    const store = new Store({
        stepId: 'first',
    });

    return (
        <Fragment>
            <State store={ store }>
                {(state) =>
                    (<Modal isOpen>
                        <ModalFlow variant="simple-with-feedback" step={ state.stepId }>
                            { steps.map((step, index) => (
                                <ModalStep key={ index } id={ step.id }>
                                    { step.content }
                                    <button onClick={ () => store.set({ stepId: step.goToId }) } >Go to { step.goToId } step</button>
                                </ModalStep>
                            )) }
                        </ModalFlow>
                    </Modal>)
                }
            </State>
        </Fragment>
    );
})
.add('Advanced', () => {
    const store = new Store({
        stepId: 'first',
    });

    return (
        <Fragment>
            <State store={ store }>
                {(state) =>
                    (<Modal isOpen>
                        <ModalFlow variant="advanced" step={ state.stepId }>
                            { steps.map((step, index) => (
                                <ModalStep key={ index } id={ step.id }>
                                    { step.content }
                                    <button onClick={ () => store.set({ stepId: step.goToId }) } >Go to { step.goToId } step</button>
                                </ModalStep>
                            )) }
                        </ModalFlow>
                    </Modal>)
                }
            </State>
        </Fragment>
    );
});
