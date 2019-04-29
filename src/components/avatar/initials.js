import { deburr } from 'lodash';

const getInitials = (name) => {
    const split = (name || '').split(' ');

    const first = split[0][0] || '';
    const second = (split.length > 1 && split[split.length - 1][0]) || '';

    return deburr((first + second).trim()).toUpperCase();
};

export default getInitials;
