import React from 'react';
import PropTypes from 'prop-types';

const CustomControl = ({ innerRef, innerProps, children, selectProps }) => (
    <div ref={ innerRef } { ...innerProps } className={ selectProps.controlClassName }>
        { children }
    </div>
);

CustomControl.propTypes = {
    selectProps: PropTypes.object.isRequired,
    innerProps: PropTypes.object.isRequired,
    innerRef: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default CustomControl;
