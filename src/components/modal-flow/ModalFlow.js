import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { castArray, isNumber, isEqual } from 'lodash';
import Logo from '../logo';
import styles from './ModalFlow.css';

const LAYOUT = {
    HALF_BORDERED: 'halfPanelBordered',
    HALF: 'halfPanel',
    WIDE: 'widePanel',
    FULL: 'fullPanel',
};

const LAYOUT_TRANSITION = {
    EMPTY_TO_HALF: 'emptyToHalf',
    HALF_TO_FULL_EXITING: 'halfToFullExiting',
    HALF_TO_FULL_ENTERING: 'halfToFullEntering',
    HALF_BORDERED_TO_WIDE_EXITING: 'halfBorderedToWideExiting',
    HALF_BORDERED_TO_WIDE_ENTERING: 'halfBorderedToWideEntering',
    HALF_BORDERED_TO_FULL_EXITING: 'halfBorderedToFullExiting',
    HALF_BORDERED_TO_FULL_ENTERING: 'halfBorderedToFullEntering',
    WIDE_TO_FULL_EXITING: 'wideToFullExiting',
    WIDE_TO_FULL_ENTERING: 'wideToFullEntering',
    FULL_TO_HALF_EXITING: 'fullToHalfExiting',
    FULL_TO_HALF_ENTERING: 'fullToHalfEntering',
    FULL_TO_WIDE_EXITING: 'fullToWideExiting',
    FULL_TO_WIDE_ENTERING: 'fullToWideEntering',
    FULL_TO_HALF_BORDERED_EXITING: 'fullToHalfBorderedExiting',
    FULL_TO_HALF_BORDERED_ENTERING: 'fullToHalfBorderedEntering',
};

class ModalFlow extends Component {
    static getDerivedStateFromProps(props, state) {
        if (state.variant && state.variant !== props.variant) {
            console.error('The ModalFlow variant prop can\'t be changed');
        }

        const children = castArray(props.children);
        const steps = children.map((child) => ({
            id: child.props.id,
        }));

        // It means new steps were added
        if (state.steps !== null && !isEqual(steps, state.steps)) {
            const subset = steps.slice(0, state.steps.length);
            const isRenderedStepLastOne = state.currentStep + 1 === state.steps.length;

            // New steps can only be added at the end so that we can ensure the flow will not be broken
            !isEqual(subset, state.steps) && console.error('New steps can only be added at the end');

            // New steps can't be added if your current step is the last one
            isRenderedStepLastOne && console.error('New steps can not be added on the last step');
        }

        const currentStepIndex = steps.findIndex((step) => step.id === props.step);
        const currentStep = {
            isFirst: currentStepIndex === 0,
            isLast: currentStepIndex + 1 === steps.length,
        };

        // It means that the step index has changed
        const requestNextStepIndex = currentStepIndex !== state.currentStepIndex && currentStepIndex;

        const layout = ModalFlow.inferLayout(currentStep.isFirst, currentStep.isLast, props.variant);
        const requestNextLayout = layout !== state.layout && layout;

        if (layout === LAYOUT.HALF_BORDERED && state.layout === LAYOUT.WIDE) {
            console.error(`This layout transition (${state.layout} to ${layout}) is not allowed`);
        }

        if (isNumber(requestNextStepIndex) && (isNumber(state.requestNextStepIndex) || state.isAnimatingStepIn)) {
            if (requestNextStepIndex === state.requestNextStepIndex) {
                return null;
            }

            return {
                pendingStepIndex: requestNextStepIndex,
            };
        }

        return {
            variant: props.variant,
            steps,
            requestNextStepIndex,
            requestNextLayout,
        };
    }

    static inferLayout = (isFirstStep, isLastStep, variant) => {
        switch (variant) {
        case 'simple': return LAYOUT.HALF;
        case 'simple-with-feedback': return isLastStep ? LAYOUT.FULL : LAYOUT.HALF;
        case 'advanced':
            if (isFirstStep) {
                return LAYOUT.HALF_BORDERED;
            } else if (isLastStep) {
                return LAYOUT.FULL;
            }

            return LAYOUT.WIDE;

        default: return LAYOUT.HALF;
        }
    };

    prevLayout = null;
    isAnimatingLayout = false;
    layoutTransition = null;
    stepsPlacement = 'right';

    state = {
        layout: null,
        currentStepIndex: 0,
        variant: null,
        steps: null,
        requestNextStepIndex: false,
        requestNextLayout: false,
        isAnimatingStepIn: false,
        pendingStepIndex: false,
    };

    render() {
        const { layout, requestNextLayout, requestNextStepIndex, variant } = this.state;

        this.layoutTransition = this.inferLayoutTransition();

        const layoutClass = layout === null ? requestNextLayout : layout;
        const leftClasses = classNames(
            styles.left,
            styles[this.layoutTransition],
            styles[variant],
        );
        const rightClasses = classNames(
            styles.right,
            styles[this.layoutTransition],
            isNumber(requestNextStepIndex) && styles.stepNotVisible,
            styles[variant],
        );
        const shouldRenderLogoRightSide = layout === LAYOUT.FULL && this.stepsPlacement === 'right';

        return (
            <div className={ classNames(styles.modalFlow, styles[layoutClass]) }>
                <div className={ leftClasses } onAnimationEnd={ variant !== 'advanced' ? this.handlePanelAnimationEnd : undefined } >
                    { shouldRenderLogoRightSide ? null : this.renderLogo() }
                    { this.stepsPlacement === 'left' && this.renderLeftSteps() }
                </div>
                <div className={ rightClasses } onAnimationEnd={ variant === 'advanced' ? this.handlePanelAnimationEnd : undefined }>
                    { shouldRenderLogoRightSide && this.renderLogo() }
                    { this.stepsPlacement === 'right' && this.renderRightSteps() }
                </div>
            </div>
        );
    }

    renderLeftSteps = () => this.renderCurrentStep();

    renderRightSteps = () => this.state.layout === LAYOUT.WIDE ? this.renderMultipleSteps() : this.renderCurrentStep();

    renderCurrentStep = () => {
        const { children } = this.props;
        const { currentStepIndex, requestNextStepIndex } = this.state;

        return (
            <div className={ classNames(styles.step, !isNumber(requestNextStepIndex) && !this.isAnimatingLayout && styles.active) }
                data-attr="step"
                onTransitionEnd={ this.handleCurrentStepTransitionEnd } >
                { !this.isAnimatingLayout && children[currentStepIndex] }
            </div>
        );
    };

    renderMultipleSteps = () => {
        const wrapperClasses = classNames(styles.wideStepsWrapper, !this.isAnimatingLayout && styles.active);

        return (
            <div className={ wrapperClasses }
                data-attr="steps-wrapper"
                onTransitionEnd={ this.handleCurrentStepTransitionEnd }>
                { !this.isAnimatingLayout && this.renderOnlyWideSteps() }
            </div>
        );
    };

    renderOnlyWideSteps = () => {
        const { children } = this.props;
        const { currentStepIndex, requestNextStepIndex } = this.state;
        const wideStepsCurrentIndex = isNumber(requestNextStepIndex) ? requestNextStepIndex - 1 : currentStepIndex - 1;

        const transform = wideStepsCurrentIndex > 0 && `translateY(calc(-${100 * wideStepsCurrentIndex}% - ${2 * wideStepsCurrentIndex}rem))`;

        return children.map((child, index) => {
            // Do not render first and last steps
            if (index === 0 || index + 1 === children.length) {
                return null;
            }

            const isCurrentStep = index === currentStepIndex;
            const shouldTranslateUp =
                isNumber(requestNextStepIndex) &&
                requestNextStepIndex === 1 &&
                requestNextStepIndex + 1 === index;

            return (
                <div key={ index }
                    style={ { transform } }
                    data-attr="step"
                    className={ classNames(
                        styles.step,
                        shouldTranslateUp && styles.translateUp,
                        isNumber(requestNextStepIndex) && requestNextStepIndex === index && styles.fullWidth,
                        !isNumber(requestNextStepIndex) && isCurrentStep && styles.active) }>
                    { child }
                </div>
            );
        });
    };

    renderLogo = () => {
        const logoWrapperClasses = classNames(
            styles.logoWrapper,
            !this.isAnimatingLayout && styles.visible
        );

        return (
            <div className={ logoWrapperClasses }>
                { this.state.layout !== null && <Logo className={ styles.logo } /> }
            </div>
        );
    };

    inferLayoutTransition = () => {
        const { layout, requestNextLayout } = this.state;

        switch (layout) {
        case null:
            if (requestNextLayout === LAYOUT.HALF || LAYOUT.HALF_BORDERED) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.EMPTY_TO_HALF;
            }
            break;
        case LAYOUT.HALF:
            if (this.prevLayout === LAYOUT.FULL && this.isAnimatingLayout) {
                this.stepsPlacement = 'right';

                return LAYOUT_TRANSITION.FULL_TO_HALF_ENTERING;
            }
            if (requestNextLayout === LAYOUT.FULL) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.HALF_TO_FULL_EXITING;
            }
            break;
        case LAYOUT.FULL:
            if (requestNextLayout === LAYOUT.HALF) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_HALF_EXITING;
            }
            if (this.prevLayout === LAYOUT.HALF && this.isAnimatingLayout) {
                this.stepsPlacement = 'left';

                return LAYOUT_TRANSITION.HALF_TO_FULL_ENTERING;
            }
            if (this.prevLayout === LAYOUT.WIDE && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.WIDE_TO_FULL_ENTERING;
            }
            if (requestNextLayout === LAYOUT.WIDE) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_WIDE_EXITING;
            }
            if (this.prevLayout === LAYOUT.HALF_BORDERED && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.HALF_BORDERED_TO_FULL_ENTERING;
            }
            if (requestNextLayout === LAYOUT.HALF_BORDERED) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_HALF_BORDERED_EXITING;
            }
            break;
        case LAYOUT.HALF_BORDERED:
            if (requestNextLayout === LAYOUT.WIDE) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.HALF_BORDERED_TO_WIDE_EXITING;
            }
            if (requestNextLayout === LAYOUT.FULL) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.HALF_BORDERED_TO_FULL_EXITING;
            }
            if (this.prevLayout === LAYOUT.FULL && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.FULL_TO_HALF_BORDERED_ENTERING;
            }
            break;
        case LAYOUT.WIDE:
            if (this.prevLayout === LAYOUT.HALF_BORDERED && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.HALF_BORDERED_TO_WIDE_ENTERING;
            }
            if (layout === LAYOUT.WIDE && requestNextLayout === LAYOUT.FULL) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.WIDE_TO_FULL_EXITING;
            }
            if (this.prevLayout === LAYOUT.FULL && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.FULL_TO_WIDE_ENTERING;
            }
            break;
        default: return null;
        }
    };

    handleCurrentStepTransitionEnd = (event) => {
        const { requestNextStepIndex, pendingStepIndex } = this.state;
        const dataAttr = event.target.getAttribute('data-attr');

        if (!dataAttr || (dataAttr === 'step' && event.propertyName === 'width')) {
            return;
        }

        if (!this.isAnimatingLayout) {
            if (isNumber(requestNextStepIndex)) {
                this.setState({
                    requestNextStepIndex: pendingStepIndex,
                    currentStepIndex: requestNextStepIndex,
                    isAnimatingStepIn: isNumber(pendingStepIndex),
                });
            } else {
                this.setState({
                    pendingStepIndex: false,
                    isAnimatingStepIn: false,
                });
            }
        }
    };

    handlePanelAnimationEnd = () => {
        const { requestNextLayout, layout, requestNextStepIndex } = this.state;

        switch (this.layoutTransition) {
        case LAYOUT_TRANSITION.EMPTY_TO_HALF:
            this.isAnimatingLayout = false;
            this.prevLayout = layout;
            this.setState({ requestNextLayout: false, layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.HALF_TO_FULL_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.HALF_TO_FULL_ENTERING:
            this.isAnimatingLayout = false;

            // Reset both `requestNextLayout` and `requestNextStepIndex` state variables since HALF_TO_FULL_ENTERING has ended
            this.setState({
                requestNextLayout: false,
                requestNextStepIndex: false,
                currentStepIndex: requestNextStepIndex,
            });
            break;

        case LAYOUT_TRANSITION.HALF_BORDERED_TO_WIDE_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.HALF_BORDERED_TO_WIDE_ENTERING:
            this.isAnimatingLayout = false;

            // No need of resetting `requestNextStepIndex` as it will be reset later by `handleCurrentStepTransitionEnd`
            this.setState({ requestNextLayout: false });
            break;

        case LAYOUT_TRANSITION.WIDE_TO_FULL_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.WIDE_TO_FULL_ENTERING:
            this.isAnimatingLayout = false;

            // Reset both `requestNextLayout` and `requestNextStepIndex` state variables since WIDE_TO_FULL_ENTERING has ended
            this.setState({
                requestNextLayout: false,
                requestNextStepIndex: false,
                currentStepIndex: requestNextStepIndex,
            });
            break;

        case LAYOUT_TRANSITION.FULL_TO_HALF_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.FULL_TO_HALF_ENTERING:
            this.isAnimatingLayout = false;

            this.setState({
                requestNextLayout: false,
                requestNextStepIndex: false,
                currentStepIndex: requestNextStepIndex,
            });
            break;

        case LAYOUT_TRANSITION.FULL_TO_WIDE_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.FULL_TO_WIDE_ENTERING:
            this.isAnimatingLayout = false;
            this.setState({ requestNextLayout: false });
            break;

        case LAYOUT_TRANSITION.HALF_BORDERED_TO_FULL_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.HALF_BORDERED_TO_FULL_ENTERING:
            this.isAnimatingLayout = false;
            this.setState({
                requestNextLayout: false,
                requestNextStepIndex: false,
                currentStepIndex: requestNextStepIndex,
            });
            break;

        case LAYOUT_TRANSITION.FULL_TO_HALF_BORDERED_EXITING:
            this.prevLayout = layout;
            this.setState({ layout: requestNextLayout });
            break;

        case LAYOUT_TRANSITION.FULL_TO_HALF_BORDERED_ENTERING:
            this.isAnimatingLayout = false;
            this.setState({
                requestNextLayout: false,
                requestNextStepIndex: false,
                currentStepIndex: requestNextStepIndex,
            });
            break;

        default: break;
        }
    };
}

ModalFlow.propTypes = {
    variant: PropTypes.oneOf(['simple', 'simple-with-feedback', 'advanced']),
    step: PropTypes.string.isRequired,
    children: PropTypes.node,
};

ModalFlow.defaultProps = {
    variant: 'simple',
};

export default ModalFlow;
