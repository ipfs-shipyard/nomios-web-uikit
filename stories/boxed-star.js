import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import { BoxedStar } from '../src';
import { TrashIcon } from '../src/components/icon';
import readme from '../src/components/boxed-star/README.md';

const background = { name: 'gainsboro', value: '#dcdcdc', default: true };
const imgUrl = 'https://lever-client-logos.s3.amazonaws.com/aaec006c-b5ef-48f1-a413-98889fda90d3-1488428386171.png';

storiesOf('BoxedStar', module)
.addDecorator(withReadme(readme))
.add('Default', () => (
    <BoxedStar>
        <TrashIcon />
    </BoxedStar>
), { backgrounds: [background] })
.add('With image', () => (
    <BoxedStar>
        <img src={ imgUrl } />
    </BoxedStar>
), { backgrounds: [background] })
.add('Removable', () => (
    <BoxedStar id="foobar" onRemove={ action('Remove') }>
        <img src={ imgUrl } />
    </BoxedStar>
), { backgrounds: [background] });
