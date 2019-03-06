import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Badge } from '../src';
import readme from '../src/components/badge/README.md';

let selected = false;
const select = () => {
    action('clicked')();
    selected = !selected;
    forceReRender();
};

const selectedList = new Array(8).fill(false);
const selectFromArray = (i) => {
    selectedList[i] = !selectedList[i];
    const buttonAction = `clicked: ${i}, ${selectedList[i]}`;

    action(buttonAction)();
    forceReRender();
};

const styles = {
    wrapper: {
        display: 'flex',
        width: '50%',
        'flex-wrap': 'wrap',
    },
    badge: {
        'margin-bottom': '1rem',
        'margin-right': '1.2rem',
    },
};

storiesOf('Badge', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <Badge onClick={ select } selected={ selected }>default</Badge>
))
.add('Badge Grid', () => (
    <div style={ styles.wrapper }>
        {selectedList.map((elem, i) => (
            <Badge
                key={ i }
                onClick={ () => selectFromArray(i) }
                style={ styles.badge }
                selected={ elem }>
                default
            </Badge>
        ))
        }
    </div>
))
.add('Knobs Playground 🏀', () => {
    const selected = boolean('selected');
    const disabled = boolean('disabled');
    const hideOverflow = boolean('hideOverflow', true);
    const children = text('children', 'badge');

    return (
        <Badge
            onClick={ action('clicked') }
            selected={ selected }
            disabled={ disabled }
            hideOverflow={ hideOverflow }>
            { children }
        </Badge>
    );
});
