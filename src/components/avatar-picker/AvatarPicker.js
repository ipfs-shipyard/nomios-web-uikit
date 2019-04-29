import React, { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from '../avatar';
import { CameraIcon, PlusIcon, UserIcon } from '../icon';

import styles from './AvatarPicker.css';

class AvatarPicker extends Component {
    state = {
        image: undefined,
        imageURL: undefined,
    };

    inputRef = createRef();

    render() {
        const { label, className, onChange, ...rest } = this.props;

        return (
            <Fragment>
                { this.renderInput() }
                <div className={ classNames(styles.container, className) } onClick={ this.handleAvatarLoaderClick }>
                    <div className={ styles.circleWrapper }>
                        { this.renderPlusIcon() }
                        { this.renderAvatar(rest) }
                    </div>
                    <label className={ styles.label }>{ label }</label>
                </div>
            </Fragment>
        );
    }

    renderInput = () => (
        <input
            ref={ this.inputRef }
            className={ styles.hidden }
            type="file"
            accept="image/*"
            onChange={ this.handleOnChange } />
    );

    renderPlusIcon = () => {
        if (!this.props.imageURL && !this.state.imageURL) {
            return (
                <div className={ styles.smallCircle }>
                    <PlusIcon className={ styles.icon } />
                </div>
            );
        }

        return (
            <div className={ styles.imageOverlay }>
                <CameraIcon className={ styles.cameraIcon } />
            </div>
        );
    };

    renderAvatar = (props) => {
        const { imageURL, ...rest } = props;
        const _imageURL = this.state.imageURL ? this.state.imageURL : imageURL;

        if (!this.props.imageURL && !this.state.imageURL && !this.props.name) {
            return (
                <div className={ styles.avatarPlaceholder }>
                    <UserIcon className={ styles.icon } />
                </div>
            );
        }

        return (
            <Avatar { ...rest } image={ _imageURL } className={ styles.circle } />
        );
    };

    handleAvatarLoaderClick = () => {
        this.inputRef.current.click();
    };

    handleOnChange = (event) => {
        const uploadedImage = Array.from(event.target.files)[0];

        if (uploadedImage) {
            this.setState({
                image: uploadedImage,
                imageURL: 'https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png',
            }, () => {
                this.props.onChange(this.state.image);
            });
        }
    };
}

AvatarPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    imageURL: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    name: PropTypes.string,
};

export default AvatarPicker;
