import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';

class ModalTrigger extends Component {
    defaultEventProps = {
        onClick: this.handleOpen,
    };

    state = { isOpen: false };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isOpen && !prevState.isOpen) {
            this.props.onOpen && this.props.onOpen();
        } else if (!this.state.isOpen && prevState.isOpen) {
            this.props.onClose && this.props.onClose();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.openCloseTimeoutId);

        if (this.state.isOpen) {
            this.props.onClose && this.props.onClose();
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
        const { isOpen } = this.state;

        return typeof trigger === 'function' ?
            trigger({
                isOpen,
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
        const { isOpen } = this.state;

        return cloneElement(modal, {
            isOpen,
            onRequestClose: this.handleModalRequestClose,
        });
    }

    handleOpen = (delay) => {
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: true });
        }, delay);
    };

    handleCancelOpen = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleClose = (delay) => {
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: false });
        }, delay);
    };

    handleToggle = (delay) => {
        if (this.state.isOpen) {
            this.handleClose(delay);
        } else {
            this.handleOpen(delay);
        }
    };

    handleModalRequestClose = (e, delay) => this.handleClose(e, delay);
}

ModalTrigger.propTypes = {
    modal: PropTypes.element.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

export default ModalTrigger;
