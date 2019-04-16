import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../modal-base';
import FlowModalContents from './FlowModalContents';

const FlowModal = ({ variant, step, children, showClose, ...rest }) => (
    <Modal { ...rest }>
        { (props) => (
            <FlowModalContents { ...props } variant={ variant } step={ step } showClose={ showClose }>
                { children }
            </FlowModalContents>
        ) }
    </Modal>
);

FlowModal.propTypes = {
    variant: PropTypes.oneOf(['simple', 'simple-with-feedback', 'advanced']),
    step: PropTypes.string.isRequired,
    showClose: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
};

FlowModal.defaultProps = {
    showClose: true,
};

export default FlowModal;
