import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { castArray, isNumber, isEqual } from 'lodash';
import Logo from '../../logo';
import { ModalClose } from '../../modal-base';
import { LAYOUT, LAYOUT_TRANSITION } from './utils/constants';
import flatContentsChildren from './utils/flatContentsChildren';
import styles from './FlowModalContents.css';

class FlowModalContents extends Component {
    static getDerivedStateFromProps(props, state) {
        if (state.variant && state.variant !== props.variant) {
            console.error('The FlowModal variant prop can\'t be changed');
        }

        if (React.Children.count(props.children) === 0) {
            console.error('FlowModal must have at least 1 step');
        }

        const flatChildren = flatContentsChildren(castArray(props.children));

        const currentChildrenIds = flatChildren.map((child) => ({ id: child.props.id }));
        const oldChildrenIds = state.flatChildren !== null && state.flatChildren.map((child) => ({ id: child.props.id }));

        // It means new steps were added
        if (state.flatChildren !== null && !isEqual(currentChildrenIds, oldChildrenIds)) {
            const subset = currentChildrenIds.slice(0, oldChildrenIds.length);
            const isRenderedStepLastOne = state.currentStep + 1 === state.flatChildren.length;

            // New steps can only be added at the end so that we can ensure the flow will not be broken
            !isEqual(subset, oldChildrenIds) && console.error('New steps can only be added at the end');

            // New steps can't be added if your current step is the last one
            isRenderedStepLastOne && console.error('New steps can not be added on the last step');
        }

        const currentStepIndex = flatChildren.findIndex((step) => step.props.id === props.step);
        const currentStep = {
            isFirst: currentStepIndex === 0,
            isLast: currentStepIndex + 1 === flatChildren.length && flatChildren.length > 1,
        };

        if (!state.in && props.in) {
            !currentStep.isFirst && console.error('Once the modal is open, the first step must be rendered');
        }

        // Short-circuit if `in` is false
        if (!props.in) {
            return {
                in: props.in,
                flatChildren,
            };
        }

        // It means that the step index has changed
        const requestNextStepIndex = currentStepIndex !== state.currentStepIndex && currentStepIndex;

        const layout = FlowModalContents.inferLayout(currentStep.isFirst, currentStep.isLast, props.variant);
        const requestNextLayout = layout !== state.layout && layout;

        if (layout === LAYOUT.HALF_BORDERED && state.layout === LAYOUT.WIDE) {
            console.error(`This layout transition (${state.layout} to ${layout}) is not allowed`);
        }

        if (isNumber(requestNextStepIndex) && (isNumber(state.requestNextStepIndex) || isNumber(state.pendingStepIndex))) {
            if (requestNextStepIndex === state.requestNextStepIndex || requestNextStepIndex === state.pendingStepIndex) {
                return null;
            }

            return {
                pendingStepIndex: requestNextStepIndex,
            };
        }

        return {
            in: props.in,
            variant: props.variant,
            flatChildren,
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
        in: false,
        layout: null,
        currentStepIndex: 0,
        variant: null,
        flatChildren: null,
        requestNextStepIndex: false,
        requestNextLayout: false,
        pendingStepIndex: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.layout && this.state.layout) {
            this.firstLayoutDidRender = true;
        }
    }

    render() {
        const { layout, requestNextLayout, requestNextStepIndex, variant } = this.state;
        const { in: in_, showClose, className } = this.props;

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

        const flowContentsClasses = classNames(
            styles.flowModalContents,
            layout && !in_ && styles.out,
            styles[layoutClass],
            className,
        );

        const modalCloseClasses = classNames(
            styles.modalClose,
            layout && styles.visible,
            (layout === LAYOUT.HALF_BORDERED || requestNextLayout === LAYOUT.HALF_BORDERED) && styles.halfBorderedPosition,
        );

        const modalCloseIconClasses = classNames(
            styles.closeIcon,
            (layout === LAYOUT.HALF_BORDERED || layout === LAYOUT.FULL) && styles.whiteColored,
        );

        return (
            <div className={ flowContentsClasses } onTransitionEnd={ this.handleFlowContentsTransitionEnd }>
                <div className={ leftClasses } onAnimationEnd={ variant !== 'advanced' ? this.handlePanelAnimationEnd : undefined }>
                    { shouldRenderLogoRightSide ? null : this.renderLogo() }
                    { this.stepsPlacement === 'left' && this.renderLeftSteps() }
                </div>
                <div className={ rightClasses } onAnimationEnd={ variant === 'advanced' ? this.handlePanelAnimationEnd : undefined }>
                    { shouldRenderLogoRightSide && this.renderLogo() }
                    { this.stepsPlacement === 'right' && this.renderRightSteps() }
                </div>
                { showClose &&
                    layout !== LAYOUT.FULL &&
                    <ModalClose className={ modalCloseClasses } iconClassName={ modalCloseIconClasses } /> }
            </div>
        );
    }

    renderLeftSteps() {
        return this.renderCurrentStep();
    }

    renderRightSteps() {
        return this.state.layout === LAYOUT.WIDE ? this.renderMultipleSteps() : this.renderCurrentStep();
    }

    renderCurrentStep() {
        const { currentStepIndex, requestNextStepIndex, flatChildren } = this.state;
        const currentStep = flatChildren[currentStepIndex];

        if (!currentStep) {
            return null;
        }

        const currentStepClassName = classNames(
            styles.step,
            !isNumber(requestNextStepIndex) && !this.isAnimatingLayout && styles.active,
            currentStep.props.className,
        );

        return (
            <div
                { ...currentStep.props }
                className={ currentStepClassName }
                data-element-type="step"
                onTransitionEnd={ this.handleCurrentStepTransitionEnd }>
                { !this.isAnimatingLayout && currentStep }
            </div>
        );
    }

    renderMultipleSteps() {
        const wrapperClasses = classNames(styles.wideStepsWrapper, !this.isAnimatingLayout && styles.active);

        return (
            <div className={ wrapperClasses }
                data-element-type="steps-wrapper"
                onTransitionEnd={ this.handleCurrentStepTransitionEnd }>
                { !this.isAnimatingLayout && this.renderOnlyWideSteps() }
            </div>
        );
    }

    renderOnlyWideSteps() {
        const { currentStepIndex, requestNextStepIndex, flatChildren } = this.state;

        const wideStepsCurrentIndex = isNumber(requestNextStepIndex) ? requestNextStepIndex - 1 : currentStepIndex - 1;
        const transform = wideStepsCurrentIndex > 0 && `translateY(calc(-${100 * wideStepsCurrentIndex}% - ${2 * wideStepsCurrentIndex}rem))`;

        return flatChildren.map((child, index) => {
            // Do not render first and last steps
            if (index === 0 || index + 1 === flatChildren.length) {
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
                    data-element-type="step"
                    className={ classNames(
                        styles.step,
                        shouldTranslateUp && styles.translateUp,
                        isNumber(requestNextStepIndex) && requestNextStepIndex === index && styles.fullWidth,
                        !isNumber(requestNextStepIndex) && isCurrentStep && styles.active) }>
                    { child }
                </div>
            );
        });
    }

    renderLogo() {
        const logoWrapperClasses = classNames(
            styles.logoWrapper,
            !this.isAnimatingLayout && styles.visible
        );

        return (
            <div className={ logoWrapperClasses }>
                { this.state.layout !== null && <Logo className={ styles.logo } /> }
            </div>
        );
    }

    inferLayoutTransition() {
        const { layout, requestNextLayout } = this.state;

        switch (layout) {
        case null:
            if (requestNextLayout === LAYOUT.HALF || LAYOUT.HALF_BORDERED) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.EMPTY_TO_HALF;
            }
            break;
        case LAYOUT.HALF:
            if (requestNextLayout === LAYOUT.FULL) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.HALF_TO_FULL_EXITING;
            }
            if (this.prevLayout === LAYOUT.FULL && this.isAnimatingLayout) {
                this.stepsPlacement = 'right';

                return LAYOUT_TRANSITION.FULL_TO_HALF_ENTERING;
            }
            break;
        case LAYOUT.FULL:
            if (requestNextLayout === LAYOUT.HALF) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_HALF_EXITING;
            }
            if (requestNextLayout === LAYOUT.WIDE) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_WIDE_EXITING;
            }
            if (requestNextLayout === LAYOUT.HALF_BORDERED) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.FULL_TO_HALF_BORDERED_EXITING;
            }
            if (this.prevLayout === LAYOUT.HALF && this.isAnimatingLayout) {
                this.stepsPlacement = 'left';

                return LAYOUT_TRANSITION.HALF_TO_FULL_ENTERING;
            }
            if (this.prevLayout === LAYOUT.WIDE && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.WIDE_TO_FULL_ENTERING;
            }
            if (this.prevLayout === LAYOUT.HALF_BORDERED && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.HALF_BORDERED_TO_FULL_ENTERING;
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
            if (requestNextLayout === LAYOUT.FULL) {
                this.isAnimatingLayout = true;

                return LAYOUT_TRANSITION.WIDE_TO_FULL_EXITING;
            }
            if (this.prevLayout === LAYOUT.HALF_BORDERED && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.HALF_BORDERED_TO_WIDE_ENTERING;
            }
            if (this.prevLayout === LAYOUT.FULL && this.isAnimatingLayout) {
                return LAYOUT_TRANSITION.FULL_TO_WIDE_ENTERING;
            }
            break;
        default: return null;
        }
    }

    checkOnEntered() {
        if (this.firstLayoutDidRender) {
            this.firstLayoutDidRender = undefined;
            this.props.onEntered && this.props.onEntered();
        }
    }

    handleFlowContentsTransitionEnd = (event) => {
        if (event.target.matches(`.${styles.flowModalContents}`)) {
            this.props.onExited && this.props.onExited();
        }
    };

    handleCurrentStepTransitionEnd = (event) => {
        const { requestNextStepIndex, pendingStepIndex } = this.state;
        const dataAttr = event.target.getAttribute('data-element-type');

        if (!dataAttr || (dataAttr === 'step' && event.propertyName === 'width')) {
            return;
        }

        if (!this.isAnimatingLayout) {
            if (isNumber(requestNextStepIndex)) {
                this.setState({
                    requestNextStepIndex: pendingStepIndex,
                    currentStepIndex: requestNextStepIndex,
                });
            } else {
                this.setState({
                    pendingStepIndex: false,
                }, this.checkOnEntered);
            }
        }
    };

    handlePanelAnimationEnd = () => {
        const { requestNextLayout, layout, requestNextStepIndex, pendingStepIndex } = this.state;

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
                currentStepIndex: !isNumber(requestNextStepIndex) ? pendingStepIndex : requestNextStepIndex,
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
                currentStepIndex: !isNumber(requestNextStepIndex) ? pendingStepIndex : requestNextStepIndex,
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
                currentStepIndex: !isNumber(requestNextStepIndex) ? pendingStepIndex : requestNextStepIndex,
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
                currentStepIndex: !isNumber(requestNextStepIndex) ? pendingStepIndex : requestNextStepIndex,
            });
            break;

        default: break;
        }
    };
}

FlowModalContents.propTypes = {
    variant: PropTypes.oneOf(['simple', 'simple-with-feedback', 'advanced']),
    step: PropTypes.string.isRequired,
    showClose: PropTypes.bool,
    in: PropTypes.bool,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element]).isRequired,
};

FlowModalContents.defaultProps = {
    variant: 'simple',
};

export default FlowModalContents;
