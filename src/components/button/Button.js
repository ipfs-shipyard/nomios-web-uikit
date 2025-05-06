import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossmarkIcon } from '../icon';
import styles from './Button.css';

class Button extends Component {
    state = {
        feedback: 'none',
        progressbarAnimationEnded: false,
        feedbackIconAnimationEnded: false,
    };

    componentDidMount() {
        this.handleFeedbackChange();
    }

    componentDidUpdate(prevProps) {
        if (this.props.feedback !== prevProps.feedback) {
            this.handleFeedbackChange(prevProps.feedback);
        }
    }

    render() {
        const { element, variant, feedback: _, fullWidth, disabled, className, children, ...rest } = this.props;
        const { feedback, progressbarAnimationEnded, feedbackIconAnimationEnded } = this.state;
        const hasFeedback = feedback !== 'none';

        const finalDisabled = disabled || hasFeedback;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            finalDisabled && styles.disabled,
            hasFeedback && !progressbarAnimationEnded ? styles.loading : styles[feedback],
            hasFeedback && !feedbackIconAnimationEnded && styles.progressVisible,
            fullWidth && styles.fullWidth,
            element.props.className,
            className,
        );

        return (
            <element.type
                { ...element.props }
                { ...rest }
                { ...this.getDisabledProps(finalDisabled) }
                className={ finalClassName }>
                <div className={ styles.textBlock }>
                    <span className={ styles.text }>{ children }</span>

                    <ProgressBar
                        running={ feedback === 'loading' }
                        className={ styles.progressBar }
                        onEnd={ this.handleProgressBarEnd } />
                </div>

                <span className={ styles.successBlock }>
                    <CheckmarkIcon className={ styles.checkmark } onTransitionEnd={ this.handleSuccessIconTransitionEnd } />
                </span>
                <span className={ styles.errorBlock }>
                    <CrossmarkIcon className={ styles.crossmark } onTransitionEnd={ this.handleErrorIconTransitionEnd } />
                </span>
            </element.type>
        );
    }

    getDisabledProps(disabled) {
        if (!disabled) {
            return {};
        }

        const elementType = this.props.element.type;

        return elementType === 'button' ?
            { disabled: true } :
            { 'aria-disabled': 'true', tabIndex: '-1' };
    }

    handleFeedbackChange(prevFeedback) {
        const { feedback } = this.props;

        if ((feedback === 'success' || feedback === 'error') && prevFeedback !== 'loading') {
            this.setState({
                feedback,
                progressbarAnimationEnded: true,
                feedbackIconAnimationEnded: false,
            });
        } else {
            this.setState({
                feedback,
                progressbarAnimationEnded: false,
                feedbackIconAnimationEnded: false,
            });
        }
    }

    handleProgressBarEnd = () => {
        this.setState({ progressbarAnimationEnded: true });
    };

    handleSuccessIconTransitionEnd = () => {
        if (this.state.feedback === 'success') {
            this.setState({ feedbackIconAnimationEnded: true });
        }
    };

    handleErrorIconTransitionEnd = (event) => {
        if (this.state.feedback === 'error' && event.target.matches('path:nth-of-type(1)')) {
            this.setState({ feedbackIconAnimationEnded: true });
        }
    };
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    feedback: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
    element: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
};

Button.defaultProps = {
    element: <button />,
    variant: 'primary',
    feedback: 'none',
};

export default Button;
