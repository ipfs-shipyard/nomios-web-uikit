import { Fragment } from 'react';
import { castArray } from 'lodash';
import FlowModalStep from '../FlowModalStep';

const flatContentsChildren = (children) => castArray(children).reduce((acc, item) => {
    if (item) {
        if (item.type === Fragment) {
            acc.push(...flatContentsChildren(item.props.children));
        } else if (item.type === FlowModalStep) {
            acc.push(item);
        } else {
            console.error('FlowModal only accepts children of type <FlowModalStep>');
        }
    }

    return acc;
}, []);

export default flatContentsChildren;
