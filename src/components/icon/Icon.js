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

const InlineIcon = ({ svg, ...rest }) => (
    <i { ...rest }
        dangerouslySetInnerHTML={ { __html: svg } } />
);

InlineIcon.propTypes = {
    svg: PropTypes.string.isRequired,
};

const Icon = (props) => {
    const { svg, interactive, className, ...rest } = props;
    const finalProps = {
        tabIndex: interactive ? 0 : undefined,
        ...rest,
        svg,
        className: classNames(styles.icon, interactive && styles.interactive, className),
    };

    return typeof svg === 'string' ?
        <InlineIcon { ...finalProps } /> :
        <SpriteIcon svg={ svg } { ...finalProps } />;
};

Icon.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    interactive: PropTypes.bool,
    className: PropTypes.string,
};

export default Icon;
