import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './CustomMenuList.css';

const CustomMenuList = ({ children, selectProps }) => (
    <div className={ classNames(styles.menuList, selectProps.menuListClassName) }>
        { children }
    </div>
);

CustomMenuList.propTypes = {
    selectProps: PropTypes.object,
    children: PropTypes.node,
};

export default CustomMenuList;
