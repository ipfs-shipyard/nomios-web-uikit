import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.css';

class Button extends Component {
    render() {
        const { variant, disabled, children, fullWidth, ...rest } = this.props;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            fullWidth && styles.fullWidth,
        );

        return (
            <button { ...rest } disabled={ disabled } className={ finalClassName } >
                <span>{ children }</span>
            </button>
        );
    }
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']).isRequired,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Button;
