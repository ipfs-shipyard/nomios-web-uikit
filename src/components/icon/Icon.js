import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Svg from '../svg';
import styles from './Icon.css';

const Icon = (props) => {
    const { className, ...rest } = props;
    const finalProps = {
        ...rest,
        className: classNames(styles.icon, className),
    };

    return <Svg { ...finalProps } />;
};

Icon.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ then: PropTypes.func.isRequired })]).isRequired,
    className: PropTypes.string,
};

export default Icon;
