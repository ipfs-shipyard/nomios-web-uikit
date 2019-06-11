import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './CustomMenu.css';

const CustomMenu = ({ innerRef, innerProps, children, selectProps }) => {
    const menuClasses = classNames(styles.menu, styles[selectProps.arrowPlacement], selectProps.menuClassName);

    return (
        <div ref={ innerRef } { ...innerProps } className={ menuClasses }>
            { children }
        </div>
    );
};

CustomMenu.propTypes = {
    selectProps: PropTypes.object.isRequired,
    innerProps: PropTypes.object.isRequired,
    innerRef: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default CustomMenu;
