import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TypeGroup.css';

class TypeGroup extends Component {
    render() {
        const { className, name } = this.props;

        const children = React.Children.map(this.props.children, (child) => cloneElement(child, {
            groupName: name,
        }));

        return (
            <div className={ classNames(styles.group, className) } onChange={ this.handleOptionChange }>
                { children }
            </div>
        );
    }

    handleOptionChange = (event) => {
        const idPrefix = event.target.getAttribute('data-id-prefix');
        const prefixedId = event.target.id;
        // Remove prefix from prefixed id
        const id = prefixedId.replace(idPrefix, '');

        this.props.onSelect(id);
    };
}

TypeGroup.propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default TypeGroup;
