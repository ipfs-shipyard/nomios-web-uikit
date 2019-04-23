import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CloseIcon } from '../icon';
import styles from './ModalClose.css';

const ModalCloseContext = createContext();

const ModalClose = ({ className, iconClassName, ...rest }) => (
    <ModalCloseContext.Consumer>
        { (onRequestClose) => (
            <button { ...rest } onClick={ onRequestClose } className={ classNames(styles.modalClose, className) }>
                <CloseIcon className={ classNames(styles.icon, iconClassName) } />
            </button>
        ) }
    </ModalCloseContext.Consumer>
);

ModalClose.propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
};

export { ModalCloseContext };

export default ModalClose;
