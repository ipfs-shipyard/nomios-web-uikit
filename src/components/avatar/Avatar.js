import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PreloadImage from 'react-image';
import getInitials from './initials';
import styles from './Avatar.css';

const cssTransitionStyles = {
    appear: styles.enter,
    appearActive: styles.enterActive,
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};

const imageContainer = (children) => (
    <TransitionGroup appear component={ null }>
        <CSSTransition classNames={ cssTransitionStyles } timeout={ 300 }>
            { children }
        </CSSTransition>
    </TransitionGroup>
);

const Avatar = ({ className, name, image, preloadImage, ...rest }) => {
    const avatarClasses = classNames(styles.avatar, className);

    return (
        <div { ...rest } className={ avatarClasses }>
            <span className={ styles.initials }> { getInitials(name) || '?' } </span>
            <PreloadImage
                src={ image }
                decode={ preloadImage }
                container={ imageContainer }
                className={ styles.image } />
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    preloadImage: PropTypes.bool,
    className: PropTypes.string,
};

Avatar.defaultProps = {
    preloadImage: true,
};

export default Avatar;
