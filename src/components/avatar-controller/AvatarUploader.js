import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Circle from '../circle';
import { CameraIcon, PlusIcon } from '../icon';

import styles from './AvatarUploader.css';

class AvatarUploader extends Component {
    render() {
        const { label, className, ...rest } = this.props;

        return (
            <div className={ classNames(styles.container, className) } onClick={ this.handleOnClick }>
                <div className={ styles.circleWrapper }>
                    { this.renderImageOverlay() }
                    <Circle { ...rest } className={ styles.circle } />
                </div>
                <label className={ styles.label }>{ label }</label>
            </div>
        );
    }

    renderImageOverlay = () => {
        if (!this.props.imageURL) {
            return <Circle className={ styles.smallCircle } icon={ <PlusIcon className={ styles.plusIcon } /> } />;
        }

        return (
            <div className={ styles.imageOverlay }>
                <CameraIcon className={ styles.cameraIcon } />
            </div>
        );
    };

    handleOnClick = () => {
        this.props.onClick();
    };
}

AvatarUploader.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    imageURL: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
};

export default AvatarUploader;
