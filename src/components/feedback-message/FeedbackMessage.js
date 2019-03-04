import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WarningIcon, InfoIcon } from '../icon';
import { Tooltip, TooltipTrigger } from '../tooltip';
import styles from './FeedbackMessage.css';

const FeedbackMessage = ({ children, type, textColor, iconPosition, variant, tooltipChildren, className }) => {
    const finalClassNames = classNames(
        styles.feedbackMessage,
        styles[type],
        styles[iconPosition],
        styles[variant],
        className
    );

    const renderTooltip = () => {
        if (!type) {
            return;
        }

        return tooltipChildren ?
            <TooltipTrigger tooltip={ <Tooltip placement="bottom" style={ { maxWidth: 286 } }>{ tooltipChildren }</Tooltip> }>
                { <div className={ styles.iconWrapper }>{ renderIcon() }</div> }
            </TooltipTrigger> :
            renderIcon();
    };

    const renderIcon = () => type === 'error' ?
        <WarningIcon className={ styles.icon } /> :
        <InfoIcon className={ styles.icon } />;

    return (
        <div style={ { color: textColor } } className={ finalClassNames }>
            { renderTooltip() }
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
