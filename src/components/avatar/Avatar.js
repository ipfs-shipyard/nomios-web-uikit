import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PreloadImage from 'react-preload-image';
import getInitials from './initials';

import styles from './Avatar.css';

const Image = ({ preloadImage, lazy, ...rest }) => preloadImage ?
    <PreloadImage { ...rest } lazy /> :
    <img { ...rest } alt="" />;

Image.propTypes = {
    lazy: PropTypes.bool,
    preloadImage: PropTypes.bool,
};

const Avatar = ({ className, name, image, preloadImage, ...rest }) => {
    const avatarClasses = classNames(styles.avatar, className);

    console.log('MY IMAGE IS THIS', image);

    return (
        <div { ...rest } className={ avatarClasses }>
            <span className={ styles.initials }> { getInitials(name) || '?' } </span>
            { image && <Image src={ image } preloadImage={ preloadImage } className={ styles.image } /> }
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
