import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Circle.css';

const renderChildren = ({ imageURL, text, icon }) => {
    if (imageURL) {
        return <img src={ imageURL } />;
    }
    if (icon) {
        return cloneElement(icon, { className: classNames(styles.icon, icon.props.className) });
    }
    if (text) {
        return <span>{ text }</span>;
    }
};

const Circle = ({ className, ...rest }) => (
    <div className={ classNames(styles.circle, className) }>
        { renderChildren(rest) }
    </div>
);

Circle.propTypes = {
    className: PropTypes.string,
    imageURL: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
};

export default Circle;
