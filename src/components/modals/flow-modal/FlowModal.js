import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from '../../modal-base';
import FlowModalContents from './FlowModalContents';
import styles from './FlowModal.css';

const FlowModal = ({ variant, step, children, showClose, contentClassName, className, ...rest }) => (
    <Modal className={ classNames(styles.modal, className) } { ...rest }>
        <FlowModalContents
            className={ classNames(styles.modalContent, contentClassName) }
            variant={ variant }
            step={ step }
            showClose={ showClose }>
            { children }
        </FlowModalContents>
    </Modal>
);

FlowModal.propTypes = {
    variant: PropTypes.oneOf(['simple', 'simple-with-feedback', 'advanced']),
    step: PropTypes.string.isRequired,
    showClose: PropTypes.bool,
    contentClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element]).isRequired,
};

FlowModal.defaultProps = {
    showClose: true,
};

export default FlowModal;
