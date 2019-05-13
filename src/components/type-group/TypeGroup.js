import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TypeGroup.css';

const TypeGroup = ({ children, className, name, onSelect, selectedId }) => {
    const clonedChildren = React.Children.map(children, (child) => cloneElement(child, {
        groupName: name,
        onSelect,
        selected: child.props.id === selectedId,
    }));

    return (
        <div className={ classNames(styles.group, className) }>
            { clonedChildren }
        </div>
    );
};

TypeGroup.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    selectedId: PropTypes.string,
    className: PropTypes.string,
    onSelect: PropTypes.func,
};

export default TypeGroup;
