import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
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
.add('Small list', () => (
    <AutocompleteSelect options={ options } />
))
.add('Long list', () => (
    <AutocompleteSelect options={ biggerOptions } />
))
.add('Knobs playground ⚽', () => {
    const optionsObj = object('Options', options, 'GROUP-ID1');

    return <AutocompleteSelect options={ optionsObj } />;
});
