import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import marked from 'marked';
import styles from './typography.css';

/* eslint-disable max-len */
storiesOf('base/Typography', module)
.addDecorator(withReadme(marked(`
# Typography
Nomios' typography, including headings.

There's a set of CSS mixins to apply styles in elements other than the native HTML ones.
Take a look at \`src/styles/mixins/typography.css\` for the available mixins.

You may use the typography CSS mixins like so:
\`\`\`css
@import "@nomios/web-uikit/styles/mixins/typography";

.my-heading {
    @mixin typography-h1 rem;
}

.my-paragraph {
    @mixin typography-body-2 rem;
}


\`\`\`
`)))
.add('All variants', () => (
    <div className={ styles.typography }>
        <div className={ styles.h1 }>h1 - Welcome to your Identity Manager</div>
        <div className={ styles.h2 }>h2 - The quick brown fox jumps over the lazy dog.</div>
        <div className={ styles.h3 }>h3 - The quick brown fox jumps over the lazy dog.</div>
        <div className={ styles.h4 }>h4 - The quick brown fox jumps over the lazy dog.</div>
        <div className={ styles.body1 }>bodycopy1 - The quick brown fox jumps over the lazy dog.</div>
        <div className={ styles.body2 }>bodycopy2 - The quick brown fox jumps over the lazy dog.</div>
        <div className={ styles.captions }>captions - The quick brown fox jumps over the lazy dog.</div>
    </div>
));
/* eslint-disable max-len */
