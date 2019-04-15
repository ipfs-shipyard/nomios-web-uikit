import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Badge.css';

const Badge = ({ selected, disabled, hideOverflow, children, onClick, ...rest }) => {
    const finalClassName = classNames(
        styles.badge,
        selected && styles.selected,
        hideOverflow && styles['hide-overflow']
    );

    return (
        <button { ...rest } onClick={ onClick } className={ finalClassName } disabled={ disabled }>
            <div>
                <span>{ children }</span>
            </div>
        </button>
    );
};

Badge.propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    hideOverflow: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Badge.defaultProps = {
    hideOverflow: true,
};

export default Badge;
