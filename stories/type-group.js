import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TypeGroup, TypeOption, UserIcon, EntityIcon, OtherIcon, CheckmarkIcon, RefreshIcon } from '../src';
import readme from '../src/components/type-group/README.md';

storiesOf('Type Group', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => {
    const store = new Store({
        selectedId: undefined,
    });
    const selectedAction = action('Selected');
    const handleOnSelect = (optionId) => {
        selectedAction(`Selected id: ${optionId}`);
        store.set({ selectedId: optionId });
    };

    return (
        <State store={ store }>
            { (state) => (
                <TypeGroup selectedId={ state.selectedId } name="example" onSelect={ handleOnSelect }>
                    <TypeOption id="1" label="Person" badge={ <CheckmarkIcon /> }>
                        <UserIcon />
                    </TypeOption>
                    <TypeOption id="2" label="Organization" badge={ <CheckmarkIcon /> }>
                        <EntityIcon />
                    </TypeOption>
                    <TypeOption id="3" label="Other" badge={ <CheckmarkIcon /> }>
                        <OtherIcon />
                    </TypeOption>
                </TypeGroup>
            ) }
        </State>
    );
})
.add('Individual TypeOption', () => (
    <TypeOption
        id="1"
        label="Person"
        badge={ <CheckmarkIcon /> }
        selected
        selectable={ false }>
        <UserIcon />
    </TypeOption>
))
.add('Knobs playground ⚽', () => {
    const store = new Store({
        selectedId: undefined,
    });
    const selectedAction = action('Selected');
    const handleOnSelect = (optionId) => {
        selectedAction(`Selected id: ${optionId}`);
        store.set({ selectedId: optionId });
    };

    const badges = {
        'checkmark-icon': <CheckmarkIcon />,
        'refresh-icon': <RefreshIcon />,
    };
    const children = {
        'user-icon': <UserIcon />,
        'entity-icon': <EntityIcon />,
        'other-icon': <OtherIcon />,
    };

    const id = text('id', '1');
    const label = text('label', 'Person');
    const selectedBadge = select('badge', [null, ...Object.keys(badges)], null);
    const selectable = boolean('selectable', true);
    const selectedChild = select('child', Object.keys(children), Object.keys(children)[0]);

    return (
        <State store={ store }>
            { (state) => (
                <TypeGroup selectedId={ state.selectedId } name="example-knobs" onSelect={ handleOnSelect }>
                    <TypeOption
                        id={ id }
                        label={ label }
                        badge={ badges[selectedBadge] }
                        selectable={ selectable }>
                        { children[selectedChild] }
                    </TypeOption>
                </TypeGroup>
            ) }
        </State>
    );
});
