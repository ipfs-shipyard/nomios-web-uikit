import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossmarkIcon } from '../icon';
import styles from './Button.css';

const FEEDBACK_OUTCOME_VISIBLE_DURATION = 1500;

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

    componentWillUnmount() {
        this.clearResetFeedbackOutcomeTimer();
    }

    render() {
        const { variant, feedback: _, fullWidth, disabled, onFeedbackAnimationEnd, className, children, ...rest } = this.props;
        const { feedback, progressbarAnimationEnded, feedbackIconAnimationEnded } = this.state;
        const hasFeedback = feedback !== 'none';

        const finalDisabled = disabled || hasFeedback;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            hasFeedback && !progressbarAnimationEnded ? styles.loading : styles[feedback],
            hasFeedback && !feedbackIconAnimationEnded && styles.progressVisible,
            fullWidth && styles.fullWidth,
            className
        );

        return (
            <button { ...rest } disabled={ finalDisabled } className={ finalClassName }>
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
            </button>
        );
    }

    startResetFeedbackOutcomeTimer() {
        this.clearResetFeedbackOutcomeTimer();

        this.resetFeedbackOutcomeTimeoutId = setTimeout(() => {
            this.setState({
                feedback: 'none',
                progressbarAnimationEnded: false,
                feedbackIconAnimationEnded: false,
            });
        }, FEEDBACK_OUTCOME_VISIBLE_DURATION);
    }

    clearResetFeedbackOutcomeTimer() {
        clearTimeout(this.resetFeedbackOutcomeTimeoutId);
    }

    handleFeedbackChange(prevFeedback) {
        const { feedback } = this.props;

        this.clearResetFeedbackOutcomeTimer();

        if ((feedback === 'success' || feedback === 'error') && prevFeedback !== 'loading') {
            this.startResetFeedbackOutcomeTimer();
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
            this.startResetFeedbackOutcomeTimer();
            this.setState({ feedbackIconAnimationEnded: true }, () => {
                this.props.onFeedbackAnimationEnd && this.props.onFeedbackAnimationEnd(true);
            });
        }
    };

    handleErrorIconTransitionEnd = (event) => {
        if (this.state.feedback === 'error' && event.target.matches('path:nth-of-type(1)')) {
            this.startResetFeedbackOutcomeTimer();
            this.setState({ feedbackIconAnimationEnded: true }, () => {
                this.props.onFeedbackAnimationEnd && this.props.onFeedbackAnimationEnd(false);
            });
        }
    };
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    feedback: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
    onFeedbackAnimationEnd: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

Button.defaultProps = {
    variant: 'primary',
    feedback: 'none',
};

export default Button;
