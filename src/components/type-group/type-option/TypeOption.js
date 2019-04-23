import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { generateRandomString } from '../../../utils';

import styles from './TypeOption.css';

class TypeOption extends Component {
    // We are using this to greatly reduce the possibility of having duplicated ids in the dom
    idPrefix = `type-option-${generateRandomString()}#`;

    render() {
        const { id, label, groupName, children, defaultSelected, badge: Badge, selectable } = this.props;
        const prefixedId = `${this.idPrefix}${id}`;
        const labelClasses = classNames(styles.label, selectable && styles.selectable);

        return (
            <div className={ styles.container }>
                <input id={ prefixedId }
                    className={ styles.input }
                    type="radio"
                    name={ groupName }
                    defaultChecked={ defaultSelected }
                    data-id-prefix={ this.idPrefix }
                    disabled={ !selectable } />
                <label htmlFor={ prefixedId } className={ labelClasses }>
                    <div className={ styles.circle }>
                        { Badge &&
                            <span className={ styles.badge }>
                                <Badge />
                            </span> }
                        { children }
                    </div>
                    { label }
                </label>
            </div>
        );
    }
}

TypeOption.propTypes = {
    id: PropTypes.string.isRequired,
    defaultSelected: PropTypes.bool,
    groupName: PropTypes.string,
    selectable: PropTypes.bool,
    children: PropTypes.node,
    label: PropTypes.string,
    badge: PropTypes.func,
};

TypeOption.defaultProps = {
    selectable: true,
};

export default TypeOption;
