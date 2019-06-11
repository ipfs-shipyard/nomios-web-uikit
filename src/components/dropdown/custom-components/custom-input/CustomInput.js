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
    selectProps: PropTypes.object.isRequired,
    innerRef: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    tabIndex: PropTypes.string,
};

export default CustomInput;
