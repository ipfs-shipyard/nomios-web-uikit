import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WarningIcon, InfoIcon } from '../icon';
import { Tooltip, TooltipTrigger } from '../tooltip';
import styles from './FeedbackMessage.css';

const FeedbackIcon = forwardRef(({ type, interactive, ...rest }, ref) => {
    const className = classNames(styles.icon, interactive && styles.interactive);

    switch (type) {
    case 'error': return <WarningIcon ref={ ref } { ...rest } className={ className } />;
    case 'info': return <InfoIcon ref={ ref } { ...rest } className={ className } />;
    default: return null;
    }
});

FeedbackIcon.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
    interactive: PropTypes.bool,
};

const FeedbackTooltip = ({ type, children }) => {
    if (!children) {
        return <FeedbackIcon type={ type } />;
    }

    return (
        <TooltipTrigger tooltip={ <Tooltip className={ styles.tooltip } placement="bottom">{ children }</Tooltip> }>
            <FeedbackIcon type={ type } interactive />
        </TooltipTrigger>
    );
};

FeedbackTooltip.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
    children: PropTypes.node,
};

const FeedbackMessage = ({ children, type, iconPosition, variant, tooltip, className, textColor, ...rest }) => {
    const finalClassNames = classNames(
        styles.feedbackMessage,
        styles[type],
        styles[iconPosition],
        styles[variant],
        className
    );
    const textStyles = type !== 'error' ? { color: textColor } : undefined;

    return (
        <div className={ finalClassNames } { ...rest }>
            { type && <FeedbackTooltip type={ type }>{ tooltip }</FeedbackTooltip> }
            <span style={ textStyles }>{ children }</span>
        </div>
    );
};

FeedbackMessage.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['small', 'large']),
    type: PropTypes.oneOf(['error', 'info']),
    textColor: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    tooltip: PropTypes.node,
    className: PropTypes.string,
};

FeedbackMessage.defaultProps = {
    iconPosition: 'left',
    variant: 'small',
};

export default FeedbackMessage;
