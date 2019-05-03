import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TypeOption.css';

class TypeOption extends Component {
    render() {
        const { label, groupName, children, selected, badge, selectable } = this.props;
        const labelClasses = classNames(styles.label, selectable && styles.selectable);

        return (
            <div className={ styles.container }>
                <label className={ labelClasses }>
                    <input className={ styles.input }
                        type="radio"
                        name={ groupName }
                        checked={ selected }
                        disabled={ !selectable }
                        onChange={ this.handleInputChange }
                        onClick={ this.handleClick } />
                    <div className={ styles.circle }>
                        { badge &&
                            <span className={ styles.badge }>
                                { badge }
                            </span> }
                        { children }
                    </div>
                    <span>{ label }</span>
                </label>
            </div>
        );
    }

    handleInputChange = () => {
        this.props.onSelect(this.props.id);
    };

    handleClick = () => {
        this.props.onClick && this.props.onClick();
    };
}

TypeOption.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    groupName: PropTypes.string,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    badge: PropTypes.element,
    label: PropTypes.string,
    id: PropTypes.string,
};

TypeOption.defaultProps = {
    selectable: true,
    selected: false,
};

export default TypeOption;
