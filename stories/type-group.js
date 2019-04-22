import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TypeGroup, TypeOption, UserIcon, EntityIcon, OtherIcon, CheckmarkIcon, RefreshIcon } from '../src';
import readme from '../src/components/type-group/README.md';

storiesOf('Type Group', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => {
    const mySelectedAction = action('Selected');
    const handleOnSelect = (optionId) => mySelectedAction(`Selected id: ${optionId}`);

    return (
        <TypeGroup name="example" onSelect={ handleOnSelect }>
            <TypeOption id="1" label="Person" badge={ CheckmarkIcon }>
                <UserIcon />
            </TypeOption>
            <TypeOption id="2" label="Organization" badge={ CheckmarkIcon }>
                <EntityIcon />
            </TypeOption>
            <TypeOption id="3" label="Other" badge={ CheckmarkIcon }>
                <OtherIcon />
            </TypeOption>
        </TypeGroup>
    );
})
.add('Individual TypeOption', () => (
    <TypeOption
        id={ 10 }
        label="Person"
        badge={ CheckmarkIcon }
        defaultSelected
        selectable={ false }>
        <UserIcon />
    </TypeOption>
))
.add('Knobs playground ⚽', () => {
    const mySelectedAction = action('Selected');
    const handleOnSelect = (optionId) => mySelectedAction(`Selected id: ${optionId}`);

    const badges = {
        'checkmark-icon': CheckmarkIcon,
        'refresh-icon': RefreshIcon,
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
        <TypeGroup name="example-knobs" onSelect={ handleOnSelect }>
            <TypeOption
                id={ id }
                label={ label }
                badge={ badges[selectedBadge] }
                selectable={ selectable }>
                { children[selectedChild] }
            </TypeOption>
        </TypeGroup>
    );
});
