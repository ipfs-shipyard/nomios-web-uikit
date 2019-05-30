import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TextButton.css';

const renderIcon = (icon, className) =>
    icon ? React.cloneElement(icon, { className: classNames(styles.icon, className) }) : null;

const TextButton = forwardRef(({ variant, icon, iconPosition, children, className, ...rest }, ref) => {
    const finalClassName = classNames(
        styles.textButton,
        styles[iconPosition],
        styles[variant],
        className
    );

    return (
        <button ref={ ref } { ...rest } className={ finalClassName }>
            { icon && iconPosition === 'left' ? renderIcon(icon, icon.props.className) : null }
            <span className={ styles.text }>{ children }</span>
            { icon && iconPosition === 'right' ? renderIcon(icon, icon.props.className) : null }
        </button>
    );
});

TextButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['small', 'large']),
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
};

TextButton.defaultProps = {
    iconPosition: 'right',
    variant: 'large',
};

export default TextButton;
