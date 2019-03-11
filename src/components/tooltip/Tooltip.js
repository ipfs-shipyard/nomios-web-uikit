import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import getModifiers from './modifiers';
import styles from './Tooltip.css';

const CLOSE_TRANSITION_TIMEOUT = 250; // Must be 50ms higher than the actual CSS duration

class Tooltip extends Component {
    boxRef = createRef();

    componentDidMount() {
        if (this.props.isOpen) {
            this.addEscapeOutsideListeners();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                this.addEscapeOutsideListeners();
            } else {
                this.removeEscapeOutsideListeners();
            }
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.scheduleUpdateRequestId);
        this.removeEscapeOutsideListeners();
    }

    render() {
        const { placement, isOpen } = this.props;

        return (
            <CSSTransition
                in={ isOpen }
                mountOnEnter
                unmountOnExit
                timeout={ CLOSE_TRANSITION_TIMEOUT }
                classNames={ {
                    enterActive: styles.enterActive,
                    enterDone: styles.enterDone,
                    exit: styles.exit,
                } }>
                <Popper
                    modifiers={ getModifiers(this.props) }
                    placement={ placement }>{ this.renderPopper }</Popper>
            </CSSTransition>
        );
    }

    renderPopper = ({ ref, style, placement, arrowProps, scheduleUpdate }) => {
        // Fix arrow not being positioned correctly in first render or when the placement changes
        // See: https://github.com/FezVrasta/react-popper/issues/88
        if (!this.placement || placement !== this.placement) {
            cancelAnimationFrame(this.scheduleUpdateRequestId);
            this.scheduleUpdateRequestId = requestAnimationFrame(() => scheduleUpdate());
        }

        this.placement = placement;

        const {
            isOpen,
            placement: _placement,
            viewportPadding,
            boundariesElement,
            className,
            contentClassName,
            boxClassName,
            onRequestCancelClose,
            onRequestClose,
            shouldCloseOnEsc,
            shouldCloseOnOutsideClick,
            children,
            variant,
            style: styleProp,
            ...rest
        } = this.props;

        const tooltipBoxClasses = classNames(styles.tooltipBox, styles[variant], boxClassName);

        return (
            <div
                { ...rest }
                ref={ ref }
                style={ { ...style, ...styleProp } }
                className={ classNames(styles.tooltip, className) }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                data-placement={ placement }>

                <div className={ styles.container }>
                    <div ref={ this.boxRef } className={ tooltipBoxClasses }>
                        <div className={ classNames(styles.tooltipContent, contentClassName) }>{ children }</div>
                    </div>

                    <div ref={ arrowProps.ref } className={ classNames(styles.arrow, styles[variant]) } style={ arrowProps.style } />
                </div>
            </div>
        );
    };

    setReferenceNode(node) {
        this.referenceNode = node;
    }

    addEscapeOutsideListeners() {
        const { shouldCloseOnOutsideClick, shouldCloseOnEsc } = this.props;

        if (shouldCloseOnOutsideClick) {
            document.addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('touchstart', this.handleMouseDown);
            document.addEventListener('touchend', this.handleMouseUp);
        }

        if (shouldCloseOnEsc) {
            document.addEventListener('keyup', this.handleKeyUp);
        }
    }

    removeEscapeOutsideListeners() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchstart', this.handleMouseDown);
        document.removeEventListener('touchend', this.handleMouseUp);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleMouseEnter = (event) => {
        this.props.onRequestCancelClose && this.props.onRequestCancelClose(event, 'mouseEnter');
    };

    handleMouseLeave = (event) => {
        // If user is selecting text, skip any check!
        if (!this.mouseDownEventTarget) {
            this.props.onRequestClose && this.props.onRequestClose(event, 'mouseLeave');
        }
    };

    handleKeyUp = (event) => {
        // Handle escape
        if (event.key === 'Escape') {
            this.props.onRequestClose && this.props.onRequestClose(event, 'escapePress');
        }
    };

    handleMouseDown = (event) => {
        // Store the event target, with support for shadow dom
        this.mouseDownEventTarget = event.composedPath ? event.composedPath()[0] : event.target;
    };

    handleMouseUp = (event) => {
        // Use also mouse down event because user might be selecting text and accidently left the tooltip
        const target = this.mouseDownEventTarget || event.target;

        this.mouseDownEventTarget = undefined;

        // Check if we clicked outside of the tooltip AND outside the reference as well
        const isOutsideBox = !this.boxRef.current.contains(target);
        const isOutsideReference = !this.referenceNode || !this.referenceNode.contains(target);

        if (isOutsideBox && isOutsideReference) {
            this.props.onRequestClose && this.props.onRequestClose(event, 'clickOutside');
        }
    };
}

Tooltip.propTypes = {
    placement: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
    viewportPadding: PropTypes.number,
    boundariesElement: PropTypes.string,
    shouldCloseOnEsc: PropTypes.bool,
    shouldCloseOnOutsideClick: PropTypes.bool,
    className: PropTypes.string,
    boxClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    // The properties below are "private"
    isOpen: PropTypes.bool,
    onRequestCancelClose: PropTypes.func,
    onRequestClose: PropTypes.func,
    variant: PropTypes.oneOf(['light', 'dark']),
};

Tooltip.defaultProps = {
    placement: 'auto',
    viewportPadding: 10,
    shouldCloseOnEsc: true,
    shouldCloseOnOutsideClick: true,
    variant: 'light',
};

export default Tooltip;
