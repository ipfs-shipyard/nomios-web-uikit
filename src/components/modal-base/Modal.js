import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { ModalCloseContext } from './ModalClose';
import styles from './Modal.css';

const MODAL_TRANSITION_DURATION = 450;

class Modal extends Component {
    static getDerivedStateFromProps(props, state) {
        const { open } = props;
        let { contentStatus, modalStatus } = state;

        // Ensure the `entering` and `exiting` status for the modal, according to the `open` prop
        if (open && modalStatus !== 'entered') {
            modalStatus = 'entering';
        } else if (!open && contentStatus === 'exited' && modalStatus !== 'exited') {
            modalStatus = 'exiting';
        }

        // Ensure the `entering` and `exiting` status for the content, according to the `open` prop
        if (open && modalStatus === 'entered' && contentStatus !== 'entered') {
            contentStatus = 'entering';
        } else if (!open && contentStatus !== 'exited') {
            contentStatus = 'exiting';
        }

        return {
            modalStatus,
            contentStatus,
        };
    }

    state = {
        modalStatus: 'exited',
        contentStatus: 'exited',
    };

    componentDidMount() {
        if (this.props.open) {
            this.startEnterTimer();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.open && !prevProps.open) {
            this.startEnterTimer();
        }

        if (this.state.contentStatus === 'entered' && prevState.contentStatus !== 'entered') {
            this.props.onEntered && this.props.onEntered();
        } else if (this.state.modalStatus === 'exited' && prevState.modalStatus !== 'exited') {
            this.props.onExited && this.props.onExited();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.enterTimeoutId);
    }

    render() {
        const { open, shouldCloseOnEsc, shouldCloseOnOverlayClick, onRequestClose, children, className } = this.props;
        const { contentStatus, modalStatus } = this.state;

        const finalClassName = {
            base: classNames(styles.modal, className),
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        };
        const finalOverlayClassName = {
            base: styles.modalOverlay,
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        };

        const modalIn = open ? true : contentStatus !== 'exited';
        const contentIn = open ? modalStatus === 'entered' : false;

        const contentProps = {
            in: contentIn,
            onEntered: this.handleContentEntered,
            onExited: this.handleContentExited,
        };

        return (
            <ModalCloseContext.Provider value={ onRequestClose }>
                <ReactModal
                    isOpen={ modalIn }
                    onRequestClose={ onRequestClose }
                    closeTimeoutMS={ MODAL_TRANSITION_DURATION }
                    onAfterClose={ this.handleModalExited }
                    shouldCloseOnEsc={ shouldCloseOnEsc }
                    shouldCloseOnOverlayClick={ shouldCloseOnOverlayClick }
                    className={ finalClassName }
                    overlayClassName={ finalOverlayClassName }
                    portalClassName={ styles.modalPortal }
                    bodyOpenClassName={ styles.modalBodyOpen }>
                    <div className={ styles.modalCenter }>
                        <div className={ styles.modalContent }>
                            { typeof children === 'function' ?
                                children(contentProps) :
                                cloneElement(children, { ...children.props, ...contentProps })
                            }
                        </div>
                    </div>
                </ReactModal>
            </ModalCloseContext.Provider>
        );
    }

    startEnterTimer = () => {
        clearTimeout(this.enterTimeoutId);
        this.enterTimeoutId = setTimeout(this.handleModalEntered, MODAL_TRANSITION_DURATION);
    };

    handleModalEntered = () => {
        this.setState({ modalStatus: 'entered' });
    };

    handleModalExited = () => {
        this.setState({ modalStatus: 'exited' });
    };

    handleContentEntered = () => {
        this.setState({ contentStatus: 'entered' });
    };

    handleContentExited = () => {
        this.setState({ contentStatus: 'exited' });
    };
}

Modal.propTypes = {
    open: PropTypes.bool,
    shouldCloseOnEsc: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onExited: PropTypes.func,
    onEntered: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

Modal.defaultProps = {
    open: false,
    shouldCloseOnEsc: false,
    shouldCloseOnOverlayClick: false,
};

export const setAppElement = (el) => ReactModal.setAppElement(el);

export default Modal;
