import React from 'react';
import { storiesOf } from '@storybook/react';
import * as components from '../src';
import { withReadme } from 'storybook-readme';
import { withKnobs, object } from '@storybook/addon-knobs';
import readme from '../src/components/icon/README.md';

const icons = Object.entries(components).filter(([name]) => /.+Icon$/.test(name));
const InfoIcon = icons.find(([name]) => name === 'InfoIcon')[1];

const styles = {
    ul: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
        listStyleType: 'none',
    },
    li: {
        position: 'relative',
        width: 200,
        height: 100,
        marginRight: 10,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.20)',
    },
    icon: {
        margin: 'auto',
    },
    name: {
        margin: 'auto',
        fontSize: 14,
        background: 'rgba(255, 255, 255)',
        color: '#000',
    },
};

storiesOf('Icon', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('All icons', () => (
    <ul style={ styles.ul }>
        { icons.map(([name, Icon]) => (
            <li key={ name } style={ styles.li }>
                <div style={ styles.icon }>
                    <Icon />
                </div>
                <code style={ styles.name }>{ `<${name} />` }</code>
            </li>
        )) }
    </ul>
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { fill: 'red', fillOpacity: 1, fontSize: '4.8rem' });

    return <InfoIcon style={ style } />;
});
