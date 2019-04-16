import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CloseIcon } from '../icon';
import styles from './ModalClose.css';

const ModalCloseContext = createContext();

const ModalClose = ({ className, ...rest }) => (
    <ModalCloseContext.Consumer>
        { (onRequestClose) => (
            <button { ...rest } onClick={ onRequestClose } className={ classNames(styles.modalClose, className) }>
                <CloseIcon className={ styles.icon } />
            </button>
        ) }
    </ModalCloseContext.Consumer>
);

ModalClose.propTypes = {
    className: PropTypes.string,
};

export { ModalCloseContext };

export default ModalClose;
