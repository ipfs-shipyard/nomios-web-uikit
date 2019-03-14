import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.css';

const SpriteIcon = ({ svg, ...rest }) => (
    <i { ...rest }>
        <svg viewBox={ svg.viewBox }>
            <use xlinkHref={ svg.symbol } />
        </svg>
    </i>
);

SpriteIcon.propTypes = {
    svg: PropTypes.object.isRequired,
};

const InlineIcon = ({ svg, ...rest }) => <i { ...rest } dangerouslySetInnerHTML={ { __html: svg } } />;

InlineIcon.propTypes = {
    svg: PropTypes.string.isRequired,
};

const Icon = (props) => {
    const { svg, className, strokeBased, ...rest } = props;
    const finalProps = {
        ...rest,
        svg,
        className: classNames(styles.icon,
            strokeBased && styles.strokeBased,
            className),
    };

    return typeof svg === 'string' ?
        <InlineIcon { ...finalProps } /> :
        <SpriteIcon svg={ svg } { ...finalProps } />;
};

Icon.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    strokeBased: PropTypes.bool,
};

export default Icon;
