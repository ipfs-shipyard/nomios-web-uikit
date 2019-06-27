import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalGlobalContext from './ModalGlobalContext';

class ModalGlobalProvider extends Component {
    state = {
        open: false,
        component: null,
        props: {},
        providerValue: {
            openModal: undefined,
            closeModal: undefined,
        },
    };

    constructor() {
        super();

        this.state.providerValue.openModal = this.handleOpenModal;
        this.state.providerValue.closeModal = this.handleCloseModal;
    }

    render() {
        return (
            <ModalGlobalContext.Provider value={ this.state.providerValue }>
                <Fragment>
                    { this.renderModal() }
                    { this.props.children }
                </Fragment>
            </ModalGlobalContext.Provider>
        );
    }

    renderModal() {
        const { component: Modal, props, open } = this.state;
        const onRequestClose = props.onRequestClose || this.handleCloseModal;

        if (!Modal) {
            return null;
        }

        return (
            <Modal
                { ...props }
                open={ open }
                onRequestClose={ onRequestClose }
                onExited={ this.handleOnExited } />
        );
    }

    handleOpenModal = (Modal) => {
        this.setState({
            open: true,
            props: Modal.props,
            component: Modal.type,
        });
    };

    handleCloseModal = () => {
        this.setState({
            open: false,
        });
    };

    handleOnExited = () => {
        const { props: { onExited } } = this.state;

        onExited && onExited();

        this.setState({
            props: {},
            component: null,
        });
    };
}

ModalGlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalGlobalProvider;
