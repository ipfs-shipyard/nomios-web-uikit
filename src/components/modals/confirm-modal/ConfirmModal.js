import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StandardModal from '../standard-modal';
import Button from '../../button';
import styles from './ConfirmModal.css';

const ConfirmModal = ({
    title,
    description,
    confirmText,
    confirmVariant,
    cancelText,
    cancelVariant,
    onConfirm,
    onCancel,
    className,
    contentClassName,
    titleClassName,
    descriptionClassName,
    buttonsClassName,
    ...rest
}) => (
    <StandardModal
        className={ classNames(styles.modal, className) }
        contentClassName={ classNames(styles.content, contentClassName) }
        { ...rest }>
        <h2 className={ classNames(styles.title, titleClassName) }>{ title }</h2>
        <p className={ classNames(styles.description, descriptionClassName) }>{ description }</p>
        <div className={ classNames(styles.buttonsContainer, buttonsClassName) }>
            <Button
                className={ styles.button }
                variant={ cancelVariant }
                onClick={ onCancel }>
                { cancelText }
            </Button>
            <Button
                className={ styles.button }
                variant={ confirmVariant }
                onClick={ onConfirm }>
                { confirmText }
            </Button>
        </div>
    </StandardModal>
);

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    confirmVariant: PropTypes.string,
    cancelText: PropTypes.string,
    cancelVariant: PropTypes.string,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    descriptionClassName: PropTypes.string,
    buttonsClassName: PropTypes.string,
};

ConfirmModal.defaultProps = {
    confirmText: 'Yes',
    confirmVariant: 'secondary',
    cancelText: 'No',
    cancelVariant: 'primary',
};

export default ConfirmModal;
