import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossIcon } from '../icon';
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
        // Skip if `feedback` hasn't changed
        if (this.props.feedback === prevProps.feedback) {
            return;
        }
        this.handleFeedbackChange(prevProps.feedback);
    }

    componentWillUnmount() {
        this.clearFeedbackOutcomeTimers();
    }

    render() {
        const { variant, disabled, children, fullWidth, ...rest } = this.props;
        const { feedback, feedbackOutcome } = this.state;
        const loading = feedback === 'loading';
        const hasFeedback = feedback !== 'none';
        const finalDisabled = disabled || loading;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            fullWidth && styles.fullWidth,
            styles[feedbackOutcome],
            loading && styles.loading,
            hasFeedback && styles.feedback,
        );

        const wrapperClassName = classNames(
            styles.buttonWrapper,
            styles[feedbackOutcome],
            styles[variant],
        );

        const hasFeedbackProp = this.props.feedback !== 'none';
        const successBlockClassName = classNames(
            hasFeedbackProp && styles.feedback,
            styles.successBlock
        );
        const errorBlockClassName = classNames(
            hasFeedbackProp && styles.feedback,
            styles.errorBlock
        );

        return (
            <div className={ wrapperClassName } ref={ this.wrapperRef }>
                <button { ...rest } disabled={ finalDisabled } className={ finalClassName } >
                    <span>{ children }</span>
                </button>
                <ProgressBar
                    running={ loading }
                    className={ styles.progressBar }
                    onBegin={ this.handleProgressBarBegin }
                    onEnd={ this.handleProgressBarEnd } />

                <span className={ successBlockClassName }>
                    <CheckmarkIcon className={ styles.checkmark } onTransitionEnd={ this.handleSuccessIconTransitionEnd } />
                </span>
                <span className={ errorBlockClassName }>
                    <CrossIcon className={ styles.cross } onTransitionEnd={ this.handleErrorIconTransitionEnd } />
                </span>
            </div>
        );
    }

    clearFeedbackOutcomeTimers() {
        clearTimeout(this.resetFeedbackOutcomeTimeoutId);
    }

    handleFeedbackChange() {
        const { feedback } = this.props;

        // If feedback prop changed to `success` or `error` without passing through `loading`,
        // force the intermidate `loading` state
        if ((feedback === 'success' || feedback === 'error') && this.state.feedback !== 'loading') {
            this.setState({ feedback: 'loading' }, () => {
                this.setState({ feedback });
            });
        // Otherwise, simply copy the feedback to the state
        } else {
            this.setState({ feedback });
        }
    }

    handleProgressBarBegin = () => {
        this.clearFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: null });
    };

    handleProgressBarEnd = () => {
        const { feedback } = this.props;

        this.clearFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: feedback }, () => {
            this.clearFeedbackOutcomeTimers();
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
