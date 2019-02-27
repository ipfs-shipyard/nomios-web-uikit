import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './FeedbackMessage.css';
import { WarningIcon, InfoIcon } from '../icon';

const FeedbackMessage = ({ children, type, textColor, iconPosition, variant, className }) => {
    const style = textColor ? { color: textColor } : {};
    const finalClassNames = classNames(
        styles.feedbackMessage,
        styles[type],
        styles[iconPosition],
        styles[variant],
        className
    );

    return (
        <div style={ style } className={ finalClassNames }>
            { renderIcon(type) }
            { children }
        </div>
    );
};

const renderIcon = (type) => {
    if (!type) {
        return;
    }

    return type === 'error' ? <WarningIcon className={ styles.icon } /> : <InfoIcon className={ styles.icon } />;
};

FeedbackMessage.propTypes = {
    children: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['small', 'large']),
    type: PropTypes.oneOf(['error', 'info']),
    textColor: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
};

FeedbackMessage.defaultProps = {
    iconPosition: 'left',
    variant: 'small',
};

export default FeedbackMessage;
