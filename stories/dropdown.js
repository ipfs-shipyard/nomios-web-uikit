import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Dropdown, LocationIcon } from '../src';
import readme from '../src/components/dropdown/README.md';

const containerStyles = { maxWidth: '350px' };

const TriggerComponent = ({ selectedData }) => (
    <div style={ { display: 'flex', alignItems: 'center' } }>
        <LocationIcon />
        <span style={ { marginLeft: '10px' } }>{ selectedData && selectedData.value }</span>
    </div>
);

const CustomOption = ({ defaultClassName, data }) => (
    <div className={ defaultClassName }>My value is: { data.value }</div>
);

const options = [
    { value: 'istanbul', label: 'Istanbul' },
    { value: 'moscow', label: 'Moscow' },
    { value: 'london', label: 'London' },
];
const biggerOptions = [
    { value: 'istanbul', label: 'Istanbul' },
    { value: 'moscow', label: 'Moscow' },
    { value: 'london', label: 'London' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'kiev', label: 'Kiev' },
    { value: 'rome', label: 'Rome' },
    { value: 'paris', label: 'Paris' },
    { value: 'lisbon', label: 'Lisbon' },
];
const customOptions = [
    { value: 'istanbul', label: 'Istanbul', render: CustomOption },
    { value: 'moscow', label: 'Moscow', render: CustomOption },
    { value: 'london', label: 'London', render: CustomOption },
];

const handleChange = (data) => action('Changed')(data);

storiesOf('Dropdown', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard small list', () => (
    <div style={ containerStyles }>
        <Dropdown
            onChange={ handleChange }
            options={ options } />
    </div>
))
.add('Standard long list', () => (
    <div style={ containerStyles }>
        <Dropdown
            onChange={ handleChange }
            options={ biggerOptions } />
    </div>
))
.add('Custom options', () => (
    <div style={ containerStyles }>
        <Dropdown
            renderOption={ CustomOption }
            onChange={ handleChange }
            options={ options } />
    </div>
))
.add('Custom trigger', () => (
    <div style={ containerStyles }>
        <Dropdown
            onChange={ handleChange }
            renderTrigger={ TriggerComponent }
            options={ customOptions } />
    </div>
))
.add('Knobs playground ⚽', () => {
    const optionsObj = object('Options', options);
    const arrowPlacement = select('Arrow Placement', { None: 'none', Left: 'left', Center: 'center', Right: 'right' });

    return (
        <div style={ containerStyles }>
            <Dropdown
                arrowPlacement={ arrowPlacement }
                options={ optionsObj }
                onChange={ handleChange } />
        </div>
    );
});
