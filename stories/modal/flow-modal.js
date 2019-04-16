import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { State, Store } from '@sambego/storybook-state';
import { FlowModal, FlowModalStep, ModalTrigger, Button } from '../../src';
import readme from '../../src/components/modals/flow-modal/README.md';

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

storiesOf('Modal/FlowModal', module)
.addDecorator(withReadme(readme))
.add('Simple', () => {
    const store = new Store({
        stepId: steps[0].id,
    });

    return (
        <State store={ store }>
            { (state) => {
                const modal = (
                    <FlowModal
                        variant="simple"
                        step={ state.stepId }
                        onExited={ () => store.set({ stepId: steps[0].id }) }>
                        { steps.map((step, index) => (
                            <FlowModalStep key={ index } id={ step.id }>
                                { step.content }
                                <button onClick={ () => store.set({ stepId: step.goToId }) }>
                                    Go to { step.goToId } step
                                </button>
                            </FlowModalStep>
                        )) }
                    </FlowModal>
                );

                return (
                    <ModalTrigger modal={ modal }>
                        <Button variant="primary">Click me</Button>
                    </ModalTrigger>
                );
            } }
        </State>
    );
})
.add('Simple with feedback', () => {
    const store = new Store({
        stepId: steps[0].id,
    });

    return (
        <State store={ store }>
            { (state) => {
                const modal = (
                    <FlowModal
                        variant="simple-with-feedback"
                        step={ state.stepId }
                        onExited={ () => store.set({ stepId: steps[0].id }) }>
                        { steps.map((step, index) => (
                            <FlowModalStep key={ index } id={ step.id }>
                                { step.content }
                                <button onClick={ () => store.set({ stepId: step.goToId }) }>
                                    Go to { step.goToId } step
                                </button>
                            </FlowModalStep>
                        )) }
                    </FlowModal>
                );

                return (
                    <ModalTrigger modal={ modal }>
                        <Button variant="primary">Click me</Button>
                    </ModalTrigger>
                );
            } }
        </State>
    );
})
.add('Advanced', () => {
    const store = new Store({
        stepId: steps[0].id,
    });

    return (
        <State store={ store }>
            { (state) => {
                const modal = (
                    <FlowModal
                        variant="advanced"
                        step={ state.stepId }
                        onExited={ () => store.set({ stepId: steps[0].id }) }>
                        { steps.map((step, index) => (
                            <FlowModalStep key={ index } id={ step.id }>
                                { step.content }
                                <button onClick={ () => store.set({ stepId: step.goToId }) }>
                                    Go to { step.goToId } step
                                </button>
                            </FlowModalStep>
                        )) }
                    </FlowModal>
                );

                return (
                    <ModalTrigger modal={ modal }>
                        <Button variant="primary">Click me</Button>
                    </ModalTrigger>
                );
            } }
        </State>
    );
});
