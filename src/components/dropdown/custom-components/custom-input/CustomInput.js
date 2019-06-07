import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomInput.css';

const CustomInput = (props) => {
    const { innerRef, tabIndex, onFocus, onBlur, selectProps } = props;
    const { value, renderTrigger, placeholder, menuIsOpen, triggerClassName } = selectProps;

    return (
        <div
            className={ styles.input }
            ref={ innerRef }
            tabIndex={ tabIndex }
            onFocus={ onFocus }
            onBlur={ onBlur }>
            { renderTrigger({ selectedData: value, placeholder, menuIsOpen, className: triggerClassName }) }
        </div>
    );
};

CustomInput.propTypes = {
    selectProps: PropTypes.object,
    tabIndex: PropTypes.string,
    innerRef: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default CustomInput;
