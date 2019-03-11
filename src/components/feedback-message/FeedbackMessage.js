import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WarningIcon, InfoIcon } from '../icon';
import { Tooltip, TooltipTrigger } from '../tooltip';
import styles from './FeedbackMessage.css';

const FeedbackIcon = ({ type }) => {
    if (type === 'error') {
        return <WarningIcon className={ styles.icon } />;
    }

    return <InfoIcon className={ styles.icon } />;
};

FeedbackIcon.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
};

const FeedbackTooltip = ({ type, children }) => {
    if (!children) {
        return <FeedbackIcon type={ type } />;
    }

    return (
        <TooltipTrigger tooltip={ <Tooltip className={ styles.tooltip } placement="bottom" >{ children }</Tooltip> }>
            { <div className={ styles.iconWrapper }>{ <FeedbackIcon type={ type } /> }</div> }
        </TooltipTrigger>
    );
};

FeedbackTooltip.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
    children: PropTypes.node,
};

const FeedbackMessage = ({ children, type, textColor, iconPosition, variant, tooltip, className }) => {
    const finalClassNames = classNames(
        styles.feedbackMessage,
        styles[type],
        styles[iconPosition],
        styles[variant],
        className
    );

    return (
        <div style={ { color: textColor } } className={ finalClassNames }>
            { type && <FeedbackTooltip type={ type }>{ tooltip }</FeedbackTooltip> }
            { children }
        </div>
    );
};

FeedbackMessage.propTypes = {
    children: PropTypes.string.isRequired,
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
