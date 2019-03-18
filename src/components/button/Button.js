import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossIcon } from '../icon';
import styles from './Button.css';

const FEEDBACK_OUTCOME_VISIBLE_DURATION = 1750;

class Button extends Component {
    wrapperRef = React.createRef();
    enterAnimation = false;

    state = {
        feedback: null,
        feedbackOutcome: null,
    };

    componentDidMount() {
        this.maybeHandleFeedbackChange();
    }

    componentDidUpdate(prevProps) {
        this.maybeHandleFeedbackChange(prevProps.feedback);
    }

    componentWillUnmount() {
        this.clearFeedbackOutcomeTimers();
    }

    render() {
        const { variant, disabled, children, fullWidth, ...rest } = this.props;
        const { feedback, feedbackOutcome } = this.state;
        const loading = feedback === 'loading';
        const hasFeedback = feedback === 'loading' || feedback === 'success' || feedback === 'error';
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

        const propsFeedback = this.props.feedback;
        const hasPropsFeedback = propsFeedback === 'loading' || propsFeedback === 'success' || propsFeedback === 'error';
        const successBlockClassName = classNames(
            hasPropsFeedback && styles.feedback,
            styles.successBlock
        );
        const errorBlockClassName = classNames(
            hasPropsFeedback && styles.feedback,
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

                <span className={ successBlockClassName } onTransitionEnd={ this.handleSpanTransitionEnd }>
                    <CheckmarkIcon className={ styles.checkmark } onTransitionEnd={ this.handleSuccessIconTransitionEnd } />
                </span>
                <span className={ errorBlockClassName } onTransitionEnd={ this.handleSpanTransitionEnd }>
                    <CrossIcon className={ styles.cross } onTransitionEnd={ this.handleErrorIconTransitionEnd } />
                </span>
            </div>
        );
    }

    maybeHandleFeedbackChange(prevFeedback) {
        const { feedback } = this.props;

        // Skip if `feedback` hasn't changed
        if (feedback === prevFeedback) {
            return;
        }

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

    clearFeedbackOutcomeTimers() {
        clearTimeout(this.resetFeedbackOutcomeTimeoutId);
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

    handleSpanTransitionEnd = (event) => {
        event.stopPropagation();
        if (this.enterAnimation) {
            this.enterAnimation = false;

            return;
        }
        this.enterAnimation = true;
    };

    handleIconTransitionEnd = (event, isSuccess) => {
        event.stopPropagation();
        if (this.enterAnimation) {
            this.props.onAnimationEnd && this.props.onAnimationEnd(isSuccess);
        }
    };

    handleSuccessIconTransitionEnd = (e) => this.handleIconTransitionEnd(e, true);

    handleErrorIconTransitionEnd = (e) => this.handleIconTransitionEnd(e, true);
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']).isRequired,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    feedback: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
    onAnimationEnd: PropTypes.func,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    feedback: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
};

export default Button;
