import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Modal, ModalClose } from '../../modal-base';
import styles from './StandardModal.css';

const TRANSITION_DURATION = 150;

const StandardModal = ({ children, showClose, contentClassName, ...rest }) => (
    <Modal { ...rest }>
        <CSSTransition
            timeout={ TRANSITION_DURATION }
            classNames={ {
                appear: styles.enter,
                enter: styles.enter,
                enterDone: `${styles.enter} ${styles.enterDone}`,
                exit: styles.exit,
                exitDone: styles.exitDone,
            } }>
            <div className={ classNames(styles.standardModal, contentClassName) }>
                { showClose && <ModalClose className={ styles.closeButton } /> }
                { children }
            </div>
        </CSSTransition>
    </Modal>
);

StandardModal.propTypes = {
    showClose: PropTypes.bool,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.node,
};

StandardModal.defaultProps = {
    showClose: true,
};

export default StandardModal;
