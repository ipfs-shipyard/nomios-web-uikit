import { get } from 'lodash';

const flatContentsChildren = (array, depth = 1) => array.reduce((acc, item) => {
    if (item) {
        if (Array.isArray(item) && depth > 0) {
            acc.push(...flatContentsChildren(item, depth - 1));
        } else {
            const type = item.type ? get(item, 'type.name', item.type).toString() : typeof item;

            switch (type) {
            case 'FlowModalStep':
                acc.push(item);
                break;
            case 'Symbol(react.fragment)':
                acc.push(...item.props.children);
                break;
            default:
                console.error(`FlowModal only accepts children of type <FlowModalStep>. Found: ${type}`);
            }
        }
    }

    return acc;
}, []);

export default flatContentsChildren;
