import React from 'react';
import PropTypes from 'prop-types';

const CustomControl = ({ innerRef, innerProps, children, selectProps }) => (
    <div ref={ innerRef } { ...innerProps } className={ selectProps.controlClassName }>
        { children }
    </div>
);

CustomControl.propTypes = {
    selectProps: PropTypes.object,
    innerProps: PropTypes.object,
    innerRef: PropTypes.func,
    children: PropTypes.node,
};

export default CustomControl;
