import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { CheckmarkIcon, CrossIcon } from '../icon';
import styles from './Button.css';

const FEEDBACK_OUTCOME_VISIBLE_DURATION = 1750;

class Button extends Component {
    wrapperRef = React.createRef();
    firstSuccessRender = true;
    firstErrorRender = true;
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

                <span className={ styles.successBlock } onTransitionEnd={ this.handleSuccessTransitionEnd }>
                    <CheckmarkIcon className={ styles.checkmark } />
                </span>
                <span className={ styles.errorBlock } onTransitionEnd={ this.handleErrorTransitionEnd }>
                    <CrossIcon className={ styles.cross } />
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

    calculateSvgPath() {
        const height = this.wrapperRef.current.offsetHeight;
        const width = this.wrapperRef.current.offsetWidth;

        const pathSTR = `M1,1h${width - 2}v${height - 2}H1z`;

        console.log('pathSTR', pathSTR);

        const proportion = 0.5;
        const perimeter = (2 * height) + (2 * width);
        const dashSize = perimeter / (2 * (1 + proportion));

        const strokeDashArray = `${dashSize * proportion} ${dashSize}`;

        console.log('strokeDashArray', strokeDashArray);

        return (
            <div styles="position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'">
                <svg xmlns="http://www.w3.org/2000/svg" width={ width } height={ height }>
                    <path stroke="#0000ff" strokeWidth="2" d={ pathSTR } fill="none" fillRule="evenodd"
                        strokeDasharray={ `${dashSize * proportion} ${dashSize}` } />
                </svg>
            </div>
        );
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

    handleTransitionEnd = (isSuccess) => {
        if (this.firstSuccessRender || this.firstErrorRender) {
            if (isSuccess) {
                this.firstSuccessRender = false;
            } else {
                this.firstErrorRender = false;
            }

            return;
        }
        if (this.enterAnimation) {
            this.enterAnimation = false;

            return;
        }
        this.enterAnimation = true;

        this.props.onAnimationEnd && this.props.onAnimationEnd(isSuccess);
    };

    handleSuccessTransitionEnd = () => this.handleTransitionEnd(true);

    handleErrorTransitionEnd = () => this.handleTransitionEnd(false);
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
