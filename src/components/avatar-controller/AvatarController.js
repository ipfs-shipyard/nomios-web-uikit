import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import AvatarUploader from './AvatarUploader';
import styles from './AvatarController.css';

class AvatarController extends Component {
    state = {
        image: undefined,
        imageURL: undefined,
    };

    inputRef = createRef();

    render() {
        const imageURL_ = this.state.imageURL ? this.state.imageURL : this.props.imageURL;

        return (
            <Fragment>
                { this.renderInput() }
                <AvatarUploader
                    { ...this.props }
                    onClick={ this.handleAvatarUploaderClick }
                    imageURL={ imageURL_ } />
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

    handleAvatarUploaderClick = () => {
        this.inputRef.current.click();
    };

    handleOnChange = (event) => {
        const uploadedImage = Array.from(event.target.files)[0];

        if (uploadedImage) {
            this.setState({
                image: uploadedImage,
                imageURL: URL.createObjectURL(uploadedImage),
            }, () => {
                this.props.onChange(this.state.image);
            });
        }
    };
}

AvatarController.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    imageURL: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
};

export default AvatarController;
