import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossmarkIcon } from '../icon';
import styles from './Button.css';

const FEEDBACK_OUTCOME_VISIBLE_DURATION = 1750;

class Button extends Component {
    wrapperRef = React.createRef();

    state = {
        feedback: 'none',
        feedbackOutcome: null,
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
        this.clearResetFeedbackOutcomeTimers();
    }

    render() {
        const { variant, fullWidth, disabled, onFeedbackAnimationEnd, className, children, ...rest } = this.props;
        const { feedback, feedbackOutcome } = this.state;
        const loading = feedback === 'loading';
        const loading2 = feedback === 'loading' || ((feedback === 'success' || feedback === 'error') && !feedbackOutcome);
        const finalDisabled = disabled || loading;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            loading2 && styles.loading,
            styles[feedbackOutcome],
            fullWidth && styles.fullWidth,
            className
        );

        const wrapperClassName = classNames(
            styles.buttonWrapper,
            styles[feedbackOutcome],
            styles[variant],
        );

        return (
            <button { ...rest } disabled={ finalDisabled } className={ finalClassName }>
                <span className={ styles.textBlock }>{ children }</span>

                <ProgressBar
                    running={ loading }
                    className={ styles.progressBar }
                    onBegin={ this.handleProgressBarBegin }
                    onEnd={ this.handleProgressBarEnd } />

                <span className={ styles.successBlock }>
                    <CheckmarkIcon className={ styles.checkmark } />
                </span>
                <span className={ styles.errorBlock }>
                    <CrossmarkIcon className={ styles.crossmark } />
                </span>
            </button>
        );
    }

    clearResetFeedbackOutcomeTimers() {
        clearTimeout(this.resetFeedbackOutcomeTimeoutId);
    }

    handleFeedbackChange() {
        const { feedback } = this.props;

        // If feedback prop changed to `success` or `error` without passing through `loading`,
        // force the intermidate `loading` state
        if ((feedback === 'success' || feedback === 'error') && this.state.feedback !== 'loading') {
            this.clearResetFeedbackOutcomeTimers();
            this.setState({ feedback }, this.handleProgressBarEnd);
        // Otherwise, simply copy the feedback to the state
        } else {
            this.setState({ feedback });
        }
    }

    handleProgressBarBegin = () => {
        this.clearResetFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: null });
    };

    handleProgressBarEnd = () => {
        const { feedback } = this.props;

        this.clearResetFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: feedback }, () => {
            this.clearResetFeedbackOutcomeTimers();
            this.resetFeedbackOutcomeTimeoutId = setTimeout(() => {
                this.setState({ feedback: 'none', feedbackOutcome: null });
            }, FEEDBACK_OUTCOME_VISIBLE_DURATION);
        });
    };

    handleSuccessIconTransitionEnd = () => {
        if (this.state.feedbackOutcome === 'success') {
            this.props.onFeedbackAnimationEnd && this.props.onFeedbackAnimationEnd(true);
        }
    };

    handleErrorIconTransitionEnd = (event) => {
        if (this.state.feedbackOutcome === 'error' && event.target.matches('path:nth-of-type(1)')) {
            this.props.onFeedbackAnimationEnd && this.props.onFeedbackAnimationEnd(false);
        }
    };
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    feedback: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
    onFeedbackAnimationEnd: PropTypes.func,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    variant: 'primary',
    feedback: 'none',
};

export default Button;
