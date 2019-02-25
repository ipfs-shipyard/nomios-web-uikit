import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.css';

export default class Button extends Component {
    static propTypes = {
        variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']).isRequired,
        disabled: PropTypes.bool,
        fullWidth: PropTypes.bool,
        children: PropTypes.node.isRequired,
    };

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
