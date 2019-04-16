import { addDecorator, configure } from '@storybook/react';
import { addReadme, configureReadme } from 'storybook-readme';
import { setAppElement } from '../src';
import './styles.css';

setAppElement('#root');

addDecorator(addReadme);

configureReadme({
  StoryPreview: ({ children }) => children
});

configure(() => require('../stories'), module);
