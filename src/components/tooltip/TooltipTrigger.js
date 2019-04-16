import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';

const DEFAULT_HOVER_DELAY = 200;

class TooltipTrigger extends Component {
    defaultEventProps = null;
    state = { open: false };

    constructor() {
        super();

        this.defaultEventProps = {
            onClick: this.handleOpen,
            onMouseEnter: () => this.handleOpen(DEFAULT_HOVER_DELAY),
            onMouseLeave: () => this.handleClose(DEFAULT_HOVER_DELAY),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.open !== prevState.open) {
            this.props.onChange && this.props.onChange(this.state.open);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.openCloseTimeoutId);

        if (this.state.open) {
            this.props.onChange && this.props.onChange(false);
        }
    }

    render() {
        return (
            <Manager>
                <Reference>{ this.renderReference }</Reference>
                { this.renderTooltip() }
            </Manager>
        );
    }

    renderReference = ({ ref }) => {
        this.setReferenceRef = ref;

        const { children: trigger } = this.props;
        const { open } = this.state;

        if (typeof trigger === 'function') {
            const element = trigger({
                state: open,
                open: this.handleOpen,
                cancelOpen: this.handleCancelOpen,
                close: this.handleClose,
                toggle: this.handleToggle,
                defaultEventProps: this.defaultEventProps,
            });

            return cloneElement(element, { ref: this.storeReferenceRef });
        }

        return cloneElement(trigger, {
            ...this.defaultEventProps,
            ref: this.storeReferenceRef,
        });
    };

    renderTooltip = () => {
        const { open } = this.state;
        const { tooltip } = this.props;

        return cloneElement(tooltip, {
            ref: this.storeTooltipRef,
            open,
            onRequestCancelClose: this.handleRequestCancelClose,
            onRequestClose: this.handleRequestClose,
        });
    };

    storeReferenceRef = (ref) => {
        this.reference = ref;

        const referenceNode = findDOMNode(this.reference);

        this.setReferenceRef && this.setReferenceRef(referenceNode);
        this.tooltip && this.tooltip.setReferenceNode(referenceNode);
    };

    storeTooltipRef = (ref) => {
        this.tooltip = ref;
        this.tooltip && this.tooltip.setReferenceNode(findDOMNode(this.reference));
    };

    handleOpen = (delay) => {
        clearTimeout(this.openCloseTimeoutId);
        this.pendingClose = false;

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ open: true });
        }, delay);
    };

    handleCancelOpen = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleClose = (delay) => {
        this.pendingClose = true;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.pendingClose = false;
            this.setState({ open: false });
        }, delay);
    };

    handleToggle = (delay) => {
        if (this.state.open) {
            this.handleClose(delay);
        } else {
            this.handleOpen(delay);
        }
    };

    handleRequestCancelClose = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleRequestClose = (reason) => {
        const isMouseLeave = reason === 'mouseLeave';

        // If the reason to close is `mouseLeave`, only close it if there's a pending close
        // We only want to "override" de trigger for `escapePress` / `clickOutside`
        if (isMouseLeave && !this.pendingClose) {
            return;
        }

        this.pendingClose = false;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ open: false });
        }, isMouseLeave ? DEFAULT_HOVER_DELAY : 0);
    };
}

TooltipTrigger.propTypes = {
    tooltip: PropTypes.element.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    onChange: PropTypes.func,
};

export default TooltipTrigger;
