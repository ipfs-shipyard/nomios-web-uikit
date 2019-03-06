import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';

const CLOSE_TRANSITION_DURATION = 350; // Must be 50ms higher than the actual CSS duration

const computeClassName = (className, classNameProp) => {
    if (classNameProp) {
        if (typeof classNameProp === 'string') {
            className.base = classNames(className.base, classNameProp);
        } else {
            className.base = classNames(className.base, classNameProp.base);
            className.base = classNames(className.base, classNameProp.afterOpen);
            className.base = classNames(className.base, classNameProp.beforeClose);
        }
    }

    return className;
};

let parentSelector;

export default class Modal extends Component {
    static setAppElement = (el) => ReactModal.setAppElement(el);
    static setPortalParentElement = (el) => {
        parentSelector = typeof el === 'string' ?
            () => document.querySelector(el) :
            () => el;
    };

    static propTypes = {
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        overlayClassName: PropTypes.string,
        portalClassName: PropTypes.string,
        bodyOpenClassName: PropTypes.string,
        parentSelector: PropTypes.func,
        children: PropTypes.node.isRequired,
    };

    state = {};

    render() {
        const {
            className,
            contentClassName,
            overlayClassName,
            portalClassName,
            bodyOpenClassName,
            children,
            parentSelector: thisParentSelector,
            ...rest
        } = this.props;
        const finalClassName = computeClassName({
            base: styles.modal,
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        }, className);
        const finalOverlayClassName = computeClassName({
            base: styles.modalOverlay,
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        }, overlayClassName);

        return (
            <ReactModal
                closeTimeoutMS={ CLOSE_TRANSITION_DURATION }
                { ...rest }
                parentSelector={ thisParentSelector || parentSelector }
                className={ finalClassName }
                overlayClassName={ finalOverlayClassName }
                portalClassName={ classNames(styles.modalPortal, portalClassName) }
                bodyOpenClassName={ classNames(styles.modalBodyOpen, bodyOpenClassName) }>
                <div className={ classNames(styles.modalContent, contentClassName) }>
                    { children }
                </div>
            </ReactModal>
        );
    }
}
