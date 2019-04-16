import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';

class ModalTrigger extends Component {
    defaultEventProps = null;
    state = { open: false };

    constructor() {
        super();

        this.defaultEventProps = {
            onClick: this.handleOpen,
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
            <Fragment>
                { this.renderTrigger() }
                { this.renderModal() }
            </Fragment>
        );
    }

    renderTrigger() {
        const { children: trigger } = this.props;
        const { open } = this.state;

        return typeof trigger === 'function' ?
            trigger({
                state: open,
                open: this.handleOpen,
                cancelOpen: this.handleCancelOpen,
                close: this.handleClose,
                toggle: this.handleToggle,
                defaultEventProps: this.defaultEventProps,
            }) :
            cloneElement(trigger, this.defaultEventProps);
    }

    renderModal() {
        const { modal } = this.props;
        const { open } = this.state;

        return cloneElement(modal, {
            open,
            onRequestClose: this.handleRequestClose,
        });
    }

    handleOpen = (delay) => {
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ open: true });
        }, delay);
    };

    handleCancelOpen = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleClose = (delay) => {
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
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

    handleRequestClose = () => this.handleClose();
}

ModalTrigger.propTypes = {
    modal: PropTypes.element.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    onChange: PropTypes.func,
};

export default ModalTrigger;
