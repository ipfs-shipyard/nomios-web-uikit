import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import marked from 'marked';
import { uniqWith, camelCase } from 'lodash';
import colors from './colors.css';

const parsedColors = uniqWith(Object.entries(colors), ([name1], [name2]) => name1 === camelCase(name2));

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
        width: 240,
        height: 180,
        marginRight: 10,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.20)',
    },
    name: {
        fontSize: 14,
        padding: '25px 15px',
        background: 'rgba(255, 255, 255)',
        color: '#000',
    },
};

storiesOf('base/Colors', module)
.addDecorator(withReadme(marked(`
# Colors

NOMIOS' color pallete.

You may use these colors in CSS files like so:

\`\`\`css
@import "@nomios/web-uikit/styles/colors";

.my-div {

        color: var(--color-armadillo);

}
\`\`\`
`)))
.add('All colors', () => (
    <ul style={ styles.ul }>
        { parsedColors.map(([name, className]) => (
            <li key={ name } style={ styles.li } className={ className }>
                <code style={ styles.name }>{ name }</code>
            </li>
        )) }
    </ul>
));
