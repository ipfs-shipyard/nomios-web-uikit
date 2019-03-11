import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WarningIcon, InfoIcon } from '../icon';
import { Tooltip, TooltipTrigger } from '../tooltip';
import styles from './FeedbackMessage.css';

const IconRenderer = ({ type }) => {
    if (type === 'error') {
        return <WarningIcon className={ styles.icon } />;
    }

    return <InfoIcon className={ styles.icon } />;
};

IconRenderer.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
};

const TooltipRenderer = ({ type, children }) => {
    if (!children) {
        return <IconRenderer type={ type } />;
    }

    return (
        <TooltipTrigger tooltip={ <Tooltip className={ styles.tooltip } placement="bottom" >{ children }</Tooltip> }>
            { <div className={ styles.iconWrapper }>{ <IconRenderer type={ type } /> }</div> }
        </TooltipTrigger>
    );
};

TooltipRenderer.propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
    children: PropTypes.node,
};

const FeedbackMessage = ({ children, type, textColor, iconPosition, variant, tooltipChildren, className }) => {
    const finalClassNames = classNames(
        styles.feedbackMessage,
        styles[type],
        styles[iconPosition],
        styles[variant],
        className
    );

    return (
        <div style={ { color: textColor } } className={ finalClassNames }>
            { type && <TooltipRenderer type={ type }>{ tooltipChildren }</TooltipRenderer> }
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
    tooltipChildren: PropTypes.node,
    className: PropTypes.string,
};

FeedbackMessage.defaultProps = {
    iconPosition: 'left',
    variant: 'small',
};

export default FeedbackMessage;
