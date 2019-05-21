import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { AutocompleteSelect } from '../src';
import readme from '../src/components/autocomplete-select/README.md';

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

storiesOf('AutocompleteSelect', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Small list', () => {
    const store = new Store({ selectedValue: '' });
    const handleSelectChange = (value) => {
        action('Changed')(value);
        store.set({ selectedValue: value });
    };

    return (
        <State store={ store }>
            { (state) => (
                <AutocompleteSelect
                    options={ options }
                    value={ state.selectedValue }
                    onChange={ handleSelectChange } />
            ) }
        </State>
    );
})
.add('Long list', () => {
    const store = new Store({ selectedValue: '' });
    const handleSelectChange = (value) => {
        action('Changed')(value);
        store.set({ selectedValue: value });
    };

    return (
        <State store={ store }>
            { (state) => (
                <AutocompleteSelect
                    options={ biggerOptions }
                    value={ state.selectedValue }
                    onChange={ handleSelectChange } />
            ) }
        </State>
    );
})
.add('Knobs playground ⚽', () => {
    const optionsObj = object('Options', options, 'GROUP-ID1');

    const store = new Store({ selectedValue: '' });
    const handleSelectChange = (value) => {
        action('Changed')(value);
        store.set({ selectedValue: value });
    };

    return (
        <State store={ store }>
            { (state) => (
                <AutocompleteSelect
                    options={ optionsObj }
                    value={ state.selectedValue }
                    onChange={ handleSelectChange } />
            ) }
        </State>
    );
});
