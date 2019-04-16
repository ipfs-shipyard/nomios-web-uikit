import { addDecorator, configure } from '@storybook/react';
import { addReadme, configureReadme } from 'storybook-readme';
import './styles.css';

addDecorator(addReadme);

configureReadme({
  StoryPreview: ({ children }) => children
});

configure(() => require('../stories'), module);
